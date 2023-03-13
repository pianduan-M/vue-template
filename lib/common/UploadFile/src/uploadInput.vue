<template>
  <div class="upload-card" @click="triggerFileInput">
    <slot name="default">
      <el-icon color="#909399">
        <Plus />
      </el-icon>
    </slot>
    <input
      type="file"
      v-show="false"
      ref="fileRef"
      :multiple="multiple"
      :accept="accept"
      @change="onFileInput"
    />
  </div>
</template>

<script>
  export default {
    name: 'UploadInput',
  };
</script>
<script setup>
  import { Plus } from '@element-plus/icons-vue';

  defineProps({
    accept: {
      type: String,
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['change']);
  const fileRef = ref();

  const triggerFileInput = () => {
    fileRef.value.click();
  };

  const onFileInput = (event) => {
    let files = event.target.files;

    files = Array.prototype.slice.call(files);

    // 检查文件类型是否正确
    try {
      files.forEach((file) => {
        if (!checkFileType(file.type)) {
          throw new Error();
        }
      });
    } catch (error) {
      return $message.error('请选择正确的文件');
    }

    emit('change', files);
    // 置空选择的文件
    event.target.value = null;
  };

  const checkFileType = (type) => {
    const acceptSplit = props.accept.split('/').map((item) => item.trim());

    if (acceptSplit[1] === '*') {
      return type.includes(acceptSplit[0]);
    } else {
      return type === props.accept;
    }
  };
</script>

<style scoped lang="scss">
  .upload-card {
    width: 104px;
    height: 104px;
    border-radius: 8px;
    border: 1px dotted rgba(0, 0, 0, 0.15);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
</style>
