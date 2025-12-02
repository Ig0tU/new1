<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  System.GeminiTerm
 *
 * @copyright   (C) 2023. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\CMSPlugin;

/**
 * Gemini Terminal Plugin
 */
class PlgSystemGeminiTerm extends CMSPlugin
{
	/**
	 * Load the terminal assets on the administrator side.
	 *
	 * @return  void
	 */
	public function onBeforeCompileHead()
	{
		$app = Factory::getApplication();

		// Only run in Administrator
		if (!$app->isClient('administrator'))
		{
			return;
		}

		$wa = $app->getDocument()->getWebAssetManager();

		// Register and Use Styles
		$wa->registerStyle('plg_system_geminiterm', 'plg_system_geminiterm/style.css');
		$wa->useStyle('plg_system_geminiterm');

		// Register and Use Scripts
		$wa->registerScript('plg_system_geminiterm', 'plg_system_geminiterm/terminal.js', [], ['type' => 'module'], ['defer' => true]);
		$wa->useScript('plg_system_geminiterm');

		// Pass Configuration to JS
		$document = $app->getDocument();
		$config = [
			'apiKey' => $this->params->get('api_key', ''),
			'activationKey' => $this->params->get('activation_key', 'Backquote'),
			'rootUri' => \Joomla\CMS\Uri\Uri::root(),
			'csrf' => \Joomla\CMS\Session\Session::getFormToken()
		];

		$document->addScriptOptions('geminiTermConfig', $config);
	}
}
