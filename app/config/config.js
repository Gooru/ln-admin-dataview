export const RESOURCE_COMPONENT_MAP = {
  'video/youtube' : 'player.resources.gru-youtube-resource',
  'resource/url'  : 'player.resources.gru-url-resource',
  'handouts'      : 'player.resources.gru-pdf-resource',
  'image'         : 'player.resources.gru-image-resource',
  'vimeo/video'   : 'player.resources.gru-vimeo-resource'
};

export const UPLOADABLE_TYPES = [
  {
    value: 'image',
    validExtensions: '.jpg, .jpeg, .gif, .png',
    validType: 'image/*'
  },
  {
    value: 'text',
    validExtensions: '.pdf',
    validType: 'application/pdf'
  }
];

export const VIDEO_RESOURCE_TYPE = 'video';

export const RESOURCE_TYPES = [
  'webpage',
  VIDEO_RESOURCE_TYPE,
  'interactive',
  'audio',
  'image',
  'text'
];

export const DEFAULT_IMAGES = {
  USER_PROFILE: 'assets/images/profile.png',
  COURSE: 'assets/images/course-default.png',
  RUBRIC: 'assets/images/rubric-default.png',
  COLLECTION: 'assets/images/collection-default.png',
  ASSESSMENT: 'assets/images/assessment-default.png',
  QUESTION_PLACEHOLDER_IMAGE: 'assets/images/question-placeholder-image.png'
};

export const K12_CATEGORY = {value: 'k_12', apiCode: 'K12', label: 'common.categoryOptions.k12'};
export const EDUCATION_CATEGORY = {value: 'higher_education', apiCode: 'HE', label: 'common.categoryOptions.higher-ed'};
export const LEARNING_CATEGORY = {value: 'professional_learning', apiCode: 'PL', label: 'common.categoryOptions.professional-dev'};

export const TAXONOMY_CATEGORIES = [
  K12_CATEGORY,
  EDUCATION_CATEGORY,
  LEARNING_CATEGORY
];

export const CONTENT_TYPES = {
  COLLECTION: 'collection',
  ASSESSMENT: 'assessment',
  EXTERNAL_ASSESSMENT: 'assessment-external',
  COURSE: 'course',
  UNIT: 'unit',
  LESSON: 'lesson',
  RESOURCE:'resource',
  QUESTION:'question',
  RUBRIC:'rubric'
};

export const ASSESSMENT_SUB_TYPES = {
  PRE_TEST: 'pre-test',
  POST_TEST: 'post-test',
  BACKFILL: 'backfill',
  BENCHMARK: 'benchmark',
  RESOURCE: 'resource'
};

export const KEY_CODES = {
  DOWN: 40,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38
};

export const VIEW_LAYOUT_PICKER_OPTIONS = {
  LIST:'list',
  THUMBNAILS:'thumbnails'
};

export const EMOTION_VALUES = [
  {value: 5, unicode: '1f601'},
  {value: 4, unicode: '1f642'},
  {value: 3, unicode: '1f610'},
  {value: 2, unicode: '1f641'},
  {value: 1, unicode: '1f625'}
];

export const SCORES = {
  REGULAR: 60,
  GOOD: 70,
  VERY_GOOD: 80,
  EXCELLENT: 90

};

export const GRADING_SCALE = [
  {LOWER_LIMIT: 0, COLOR: '#F46360'}, //red-400
  {LOWER_LIMIT: 60, COLOR: '#ED8E36'}, //orange-400
  {LOWER_LIMIT: 70, COLOR: '#F8BA41'}, //yellow-400
  {LOWER_LIMIT: 80, COLOR: '#A3CA9F'}, //green-200
  {LOWER_LIMIT: 90, COLOR: '#4B9741'} //green-400
];

export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher'
};

export const TAXONOMY_LEVELS = {
  COURSE:   'course',
  DOMAIN:   'domain',
  STANDARD: 'standard',
  MICRO:    'micro-standard'
};

export const NAVIGATION_MENUS = ['gcm', 'activities', 'learners', 'suggest'];

export const NAVIGATION_MENUS_INDEX = {'gcm' : 0, 'activities' : 1, 'learners' : 2, 'suggest' : 3, 'learner':2};



export const CODE_TYPES = {
  STANDARD_CATEGORY: 'standard_level_0',
  STANDARD: 'standard_level_1',
  SUB_STANDARD: 'standard_level_2',
  LEARNING_TARGET_L0: 'learning_target_level_0',
  LEARNING_TARGET_L1: 'learning_target_level_1',
  LEARNING_TARGET_L2: 'learning_target_level_2'
};

//Question Types
export const QUESTION_TYPES = {
  multipleChoice: 'MC',
  multipleAnswer: 'MA',
  trueFalse: 'T/F',
  openEnded: 'OE',
  fib: 'FIB',
  hotSpotText: 'HS_TXT',
  hotSpotImage: 'HS_IMG',
  hotTextReorder: 'HT_RO',
  hotTextHighlight: 'HT_HL'
};
