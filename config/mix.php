<?php

return [
    'publicPath' => 'web',
    'assetPath' => 'dist',
    'webpackServerUrl' => 'hot-' . getenv('VIRTUAL_HOST')
];