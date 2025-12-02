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
use Joomla\CMS\Uri\Uri;

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
		// Assets are installed to media/plg_system_geminiterm/css/style.css
		// registerStyle('name', 'relative/path') looks in the system media folder by default for standard paths,
		// but explicit path 'media/plg_system_geminiterm/css/style.css' is safer/clearer.
		// However, standard syntax is:
		$wa->registerStyle('plg_system_geminiterm', 'media/plg_system_geminiterm/css/style.css');
		$wa->useStyle('plg_system_geminiterm');

		// Register and Use Scripts
		$wa->registerScript('plg_system_geminiterm', 'media/plg_system_geminiterm/js/terminal.js', [], ['type' => 'module'], ['defer' => true]);
		$wa->useScript('plg_system_geminiterm');

		// Pass Configuration to JS
		$document = $app->getDocument();
		$config = [
			'apiKey' => $this->params->get('api_key', ''),
			'activationKey' => $this->params->get('activation_key', 'Backquote'),
			'rootUri' => Uri::root(),
			'csrf' => \Joomla\CMS\Session\Session::getFormToken()
		];

		$document->addScriptOptions('geminiTermConfig', $config);
	}
}
