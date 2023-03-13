<template>
  <div class="my-upload-file">
    <ul class="upload-list flex">
      <UploadFileItem
        v-for="item in _fileList"
        :data="item"
        :key="item.fileUrl"
        @remove="onRemove"
        @preview="onPreview"
      />
    </ul>

    <uploadInput @change="onFileChange" v-bind="$attrs">
      <slot></slot>
    </uploadInput>

    <span class="mt-20 upload-tips" v-if="uploadTips">{{ uploadTips }}</span>
    <el-image-viewer
      v-if="isShow"
      :url-list="urlList"
      :z-index="2000"
      hide-on-click-modal
      @close="onCloseImageViewer"
      :initial-index="initialIndex"
    >
      <video
        autoplay
        controls
        v-if="showVideo"
        class="preview-video"
        :src="previewVideoSrc"
      ></video>
    </el-image-viewer>
  </div>
</template>

<script>
  export default {
    name: 'UploadFile',
  };
</script>
<script setup>
  import UploadFileItem from './UploadFileItem.vue';
  import uploadInput from './uploadInput.vue';
  import { uploadFile } from '@/api';
  import { useImageViewer } from './hooks/useImageViewer';
  import { watch } from 'vue';

  const props = defineProps({
    fileList: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: undefined,
    },
    uploadTips: {
      type: String,
      default: undefined,
    },
  });

  const emit = defineEmits(['update:fileList']);

  // 内部记录上传列表状态
  const _fileList = ref([]);
  // 监听 fileList

  watch(
    () => props.fileList,
    (newVal) => {
      if (!newVal.length) {
        return (_fileList.value = []);
      }
      let fileList = [];

      for (let index = 0; index < newVal.length; index++) {
        const file = newVal[index];

        if (file) {
          fileList.push({
            status: 'success',
            fileUrl: file.fileUrl,
            mime: file.mime,
            id: file.id,
          });
        } else {
          fileList.push({ ..._fileList.value[index] });
        }
      }

      const oldLen = _fileList.value.length;
      const newLen = fileList.length;

      if (oldLen > newLen) {
        for (let i = newLen; i < oldLen; i++) {
          const item = _fileList.value[i];
          if (item.status === 'upload') {
            fileList.push({ ...item });
          }
        }
      }

      _fileList.value = fileList;
    },
    { immediate: true },
  );

  // 监听文件选择
  const onFileChange = async (files) => {
    const oldLen = _fileList.value.length;
    try {
      await handleExceed(oldLen + files.length);
    } catch (error) {
      files = files.slice(oldLen, props.limit - oldLen);
    }

    const list = files.map((item) => {
      const fileUrl = window.URL.createObjectURL(item);
      const mime = item.type;
      const name = item.name;
      const id = Math.random();

      return {
        status: 'upload',
        fileUrl,
        mime,
        name,
        id,
        raw: item,
      };
    });

    _fileList.value.push(...list);

    handleUploadAction();
  };

  // 操作上传
  const handleUploadAction = async () => {
    const requestList = [];
    _fileList.value.forEach((file, index) => {
      if (file.status == 'upload') {
        requestList.push(handleUploadFile(file, index));
      }
    });

    await Promise.all(requestList);

    const oldFileList = [];
    _fileList.value.forEach((item, index) => {
      const fileItem = item.response ? item.response : props.fileList[index];

      switch (item.status) {
        case 'success':
          oldFileList.push(fileItem);
          break;
        case 'upload':
          oldFileList.push(undefined);
          break;
      }
    });
    emit('update:fileList', oldFileList);
  };

  const handleUploadFile = async (file) => {
    try {
      // const formData = new FormData();
      // formData.append('approvalPictureFileUpload', file);
      const formData = {
        file: file.raw,
      };

      const { data } = await uploadFile(formData);

      // const result = data.filesMap.approvalPictureFileUpload[0];

      const result = data;
      file.status = 'success';
      file.response = result;
    } catch (error) {
      console.log(error, 'update');
      const index = _fileList.value.findIndex((item) => item.id === file.id);

      _fileList.value.splice(index, 1);

      // 提示错误
      const name = file.name;
      // $message.error(`${name} 上传失败！`);
    }
  };

  const onRemove = ({ fileUrl }) => {
    const fileList = [...props.fileList];
    console.log(fileUrl, fileList, 'fileUrl');
    const index = _fileList.value.findIndex((item) => item.fileUrl === fileUrl);
    if (index > -1) {
      fileList.splice(index, 1);
      emit('update:fileList', fileList);
    }
  };

  const handleExceed = async (length) => {
    if (length > props.limit) {
      if (props.exceed) {
        props.exceed();
      } else {
        $message.error(`上传数量超过${props.limit}, 请先删除`);
      }

      return Promise.reject();
    }
  };

  const showVideo = ref(false);
  const previewVideoSrc = ref('');

  const onPreview = ({ fileUrl, mime = '' }) => {
    const fileList = [...props.fileList];

    if (mime.includes('video')) {
      showVideo.value = true;
      previewVideoSrc.value = fileUrl;
      isShow.value = true;
    } else {
      showVideo.value = false;
      let index = fileList.findIndex((item) => item.fileUrl === fileUrl);
      index = index === -1 ? 0 : index;

      handleShowImageViewer(
        fileList.map((item) => item.fileUrl),
        index,
      );
    }
  };

  const { isShow, urlList, handleShowImageViewer, onCloseImageViewer, initialIndex } =
    useImageViewer();
</script>

<style scoped lang="scss">
  .my-upload-file {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    .upload-tips {
      display: flex;
      align-items: flex-end;
      height: 100%;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }

    .upload-list {
      margin: 0;
      padding: 0;
    }
  }

  .preview-video {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
