import { CacheTypeEnum } from '@/enums/cacheEnum';

const setting = {
  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
};

export default setting;
