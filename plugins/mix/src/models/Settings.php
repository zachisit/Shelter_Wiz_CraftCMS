<?php
/**
 * Craft Mix
 *
 * @author    mister bk! GmbH
 * @copyright Copyright (c) 2017-2018 mister bk! GmbH
 * @link      https://www.mister-bk.de/
 */

namespace misterbk\mix\models;

use craft\base\Model;

class Settings extends Model
{
    /**
     * Path to the public directory.
     *
     * @var string
     */
    public $publicPath = 'web';

    /**
     * Path to the asset directory.
     *
     * @var string
     */
    public $assetPath = 'assets';
    
    /**
     * URL of HMR Host
     *
     * @var string
     */
    public $webpackServerUrl = '';


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['publicPath', 'assetPath','webpackServerUrl'], 'required'],
            [['publicPath', 'assetPath','webpackServerUrl'], 'string'],
        ];
    }
}
