<?php

return [
    
    'showLabel' => getenv('CRAFT_ENV_LABEL_SHOW') === 'true' ? true: false,
    'labelText' => getenv('CRAFT_ENV_LABEL_TEXT'),
    'prefixText' => getenv('CRAFT_ENV_LABEL_PREFIX'),
    'suffixText' => getenv('CRAFT_ENV_LABEL_SUFFIX'),
    'labelColor' => getenv('CRAFT_ENV_LABEL_BG_COLOR'),
    'textColor' => getenv('CRAFT_ENV_LABEL_TEXT_COLOR'),
    
];