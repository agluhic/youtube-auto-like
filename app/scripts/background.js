/*
 * Script running in background for the plugin
 * Currently detect update, and smooth transition between versions
 */
function handleInstalled(details) {
	// reset the storage for tansition from 2.0.3
	//browser.storage.local.clear();
	browser.storage.local.get("version").then( (item) => {
		if ( (Object.keys(item).length === 0 && item.constructor === Object) || (VERSION.version != item) ) { //if empty or different
			browser.storage.local.set(VERSION)
			browser.tabs.create({
				url: "update_info.html"
			});
		}
	})	
}
// triggered when new  version installed
browser.runtime.onInstalled.addListener(handleInstalled);
