<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => true,

        'useEmailAsUsername' => true,

        'generateTransformsBeforePageLoad' => true,

        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),

        'enableCsrfProtection' => true,

        // Disable template caching because we use blitz
        'enableTemplateCaching' => false,

        'aliases' => [
            '@assetBaseUrl' => getenv('DEFAULT_SITE_URL') . '/content',
            '@assetBasePath' => getenv('BASE_PATH') . 'content',
        ],

        'devMode' => getenv('DEV_MODE'),
        'allowUpdates' => getenv('ALLOW_UPDATES'),
        'backupOnUpdate' => getenv('BACKUP_ON_UPDATE'),
        'isSystemLive' => getenv('IS_SYSTEM_LIVE'),
        'allowAdminChanges' => getenv('ALLOW_ADMIN_CHANGES')
    ]
];
