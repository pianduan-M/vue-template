<!-- 工地二维图 -->
<template>
  <div class="two-dimensional-base-map" @mousewheel.stop="noOp">
    <div class="map-container" ref="mapRef"></div>
  </div>
</template>

<script>
  const AMap = window.AMap;
  export default {
    name: 'HomeBaseMap',
    components: {},
    props: {
      // 二维图
      cadInfo: {
        type: Object,
        default: null,
      },
      personList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        projectLnglat: [],
        personMarkerList: [],
      };
    },
    mounted() {
      this.initMap();
    },
    beforeUnmount() {
      this.timer && clearInterval(this.timer);
    },
    methods: {
      noOp() {},
      initMap() {
        this.map = new AMap.Map(this.$refs.mapRef, {
          zoom: 18, //级别
          center: [114.1635536721926, 22.636290174485055], //中心点坐标
          features: ['bg', 'road', 'point'], //隐藏默认楼块
          mapStyle: 'amap://styles/795d98633567bbe3bf8308bb9ad08af3',
          zooms: [3, 30],
          expandZoomRange: true,
        });

        // 设置图片图层
        if (this.cadInfo) {
          this.setMapImageLayer(this.cadInfo);
        }
      },
      // 添加地图 ImageLayer
      setMapImageLayer(cadInfo) {
        if (!cadInfo.cadPoint && typeof cadInfo.cadPoint !== 'string') return;
        if (this.imageLayer) {
          this.map.remove(this.imageLayer);
        }

        let [southLnglat, northEastLnglat] = cadInfo.cadPoint.split(';');
        southLnglat = southLnglat.split(',');
        northEastLnglat = northEastLnglat.split(',');

        // eslint-disable-next-line no-undef
        this.imageLayer = new AMap.ImageLayer({
          url: cadInfo.cad,
          bounds: new AMap.Bounds(southLnglat, northEastLnglat),
          zooms: [0, 20],
          map: this.map,
          zIndex: 100,
        });
      },
      // 获取项目详情地址
      async getProjectInfo() {
        try {
          this.requestCount = this.requestCount ? ++this.requestCount : 0;
          const requestCount = this.requestCount;

          const res = await fetchProjectInfo(this.userProjectId);

          if (requestCount !== this.requestCount) return;

          const data = res.data;
          const { longitude, dimension } = data;

          if (longitude && dimension) {
            return (this.projectLnglat = [longitude, dimension]);
          }

          if (!data.address) return;
          const address = `${data.provinceText}${data.cityText}${
            data.areaText ? data.areaText : ''
          }${data.address}`;

          const lnglat = await this.address2geocoder(address);

          if (!lnglat) return;
          const { lng, lat } = lnglat;
          this.projectLnglat = [lng, lat];
        } catch (error) {
          console.log(error);
        }
      },

      // 根据地址查询经纬度
      address2geocoder(location) {
        return new Promise((resolve) => {
          let geocoder = new AMap.Geocoder({
            city: location,
          });
          geocoder.getLocation(location, (status, result) => {
            try {
              resolve(result.geocodes[0].location);
            } catch (e) {
              resolve({ lng: 0, lat: 0 });
            }
          });
        });
      },

      createMarker(personInfo) {
        const { jobPersonnelInfo, safeBeltMessage } = personInfo;
        const personMarker = this.personMarkerList.find((marker) => {
          const extData = marker.getExtData();
          return extData.jobPersonnelInfo.id === jobPersonnelInfo.id;
        });

        if (safeBeltMessage.borderType === 4) {
          return this.removeMarker(personInfo);
        }

        if (!safeBeltMessage.longs || !safeBeltMessage.lat) {
          return;
        }

        // 如果有改变位置
        if (personMarker) {
          personMarker.setPosition(new AMap.LngLat(safeBeltMessage.longs, safeBeltMessage.lat));

          const el = genPersonMarker(personInfo, this.$emit.bind(this), this.$t.bind(this));
          personMarker.setContent(el);
        } else {
          // 没有经纬度不创建
          if (!safeBeltMessage.longs || !safeBeltMessage.lat) return;
          const el = genPersonMarker(personInfo, this.$emit.bind(this), this.$t.bind(this));
          const marker = new AMap.Marker({
            position: new AMap.LngLat(safeBeltMessage.longs, safeBeltMessage.lat),
            // icon, // 添加 Icon 图标 URL
            title: personInfo.personnelName,
            extData: personInfo,
            content: el,
            anchor: 'bottom-center',
          });
          this.personMarkerList.push(marker);
          this.map.add(marker);
        }
      },

      checkDiffSafeBeltMessage(oldSafeBeltMessage, newSafeBeltMessage) {
        let result = false;

        if (
          oldSafeBeltMessage.high !== newSafeBeltMessage.high ||
          oldSafeBeltMessage.borderType !== newSafeBeltMessage.borderType
        ) {
          result = true;
        }
        const oldSafetyBeltAlert = oldSafeBeltMessage.safetyBeltAlert || [];
        const newSafetyBeltAlert = newSafeBeltMessage.safetyBeltAlert || [];

        if (oldSafetyBeltAlert.length !== newSafetyBeltAlert.length) {
          result = true;
        } else {
          for (let i = 0; i < oldSafetyBeltAlert.length; i++) {
            const oldItem = oldSafetyBeltAlert[i] || {};
            const newItem = newSafetyBeltAlert[i] || {};
            if (oldItem.id !== newItem.id) {
              result = true;
              break;
            }
          }
        }
        return result;
      },

      removeMarker(personInfo) {
        if (personInfo) {
          const { jobPersonnelInfo } = personInfo;

          const index = this.personMarkerList.findIndex((marker) => {
            const extData = marker.getExtData();
            return extData.jobPersonnelInfo.id === jobPersonnelInfo.id;
          });

          if (index === -1) return;
          const personMarker = this.personMarkerList[index];
          this.personMarkerList.splice(index, 1);
          personMarker && this.map.remove(personMarker);
        } else {
          this.personMarkerList = [];
          this.map.clearMap();
        }
      },

      handleOpenPersonalDetail(event) {
        console.log('handleOpenPersonalDetail');
        const { target } = event;
        if (target) {
          const personInfo = target.getExtData();

          if (personInfo) {
            this.$emit('openPersonInfo', personInfo.jobPersonnelInfo.id);
          }
        }
      },
      handleMarkerMouseover(event) {
        console.log(event);
        const { target } = event;
        if (target) {
          const personInfo = target.getExtData();

          if (personInfo) {
            this.$emit('on-marker-hover', personInfo, event);
          }
        }
      },

      handleDrawTrack(path, config) {
        if (!path || path.length === 0) return;

        this.removeTrack();

        // 绘制起点
        this.trackStart = new AMap.Marker({
          position: path[0],
          direction: 'center',
          content: `<div style="width:20px;height:20px;background:#ff4029;border-radius:50%;color:#fff;font-size:12px;text-align: center;line-height:18px;transform:translate(-50%,-50%)">起点</div>`,
        });

        // 绘制结束点
        this.trackEnd = new AMap.Marker({
          position: path[path.length - 1],

          content: `<div style="width:18px;height:18px;background:#ff4029;border-radius:50%;color:#fff;transform:translate(-50%,-50%)"></div>`,
        });

        // 绘制轨迹
        this.polyline = new AMap.Polyline({
          map: this.map,
          path: path,
          showDir: true,
          strokeColor: '#FF4029', //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 5, //线宽
          // strokeStyle: "solid"  //线样式
          ...config,
        });
        this.map.add([this.trackStart, this.trackEnd]);
        this.map.setFitView(null, false, [50, 0, 0, 0]);
      },
      removeTrack() {
        if (this.trackStart) {
          this.map.remove(this.trackStart);
        }
        if (this.polyline) {
          this.map.remove(this.polyline);
        }
        if (this.trackEnd) {
          this.map.remove(this.trackEnd);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .two-dimensional-base-map {
    height: 100%;
    padding: 20px;

    .map-container {
      height: 100%;
    }
  }
</style>
