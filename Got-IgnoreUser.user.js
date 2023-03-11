// ==UserScript==
// @name           GOT-IgnoreUser
// @namespace      GOT-IgnoreUser
// @description    Hides messages from users you want to ignore on gathering.tweakers.net
// @include        *gathering.tweakers.net/*
// ==/UserScript==
// 

//Add the user(s) you want to ignore to this array ['user1', 'user2']
var usersToIgnore = ['user1'];

//What do we want to do with their posts: 'hide' or 'replace'
var action = 'replace';

//Find all messages via username class
var classUsername = document.evaluate("//p[@class='username']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < classUsername.snapshotLength; i++) 
{
	var linkToUsername = classUsername.snapshotItem(i);
	var userName = linkToUsername.firstChild.textContent;
	var indexOfUsername = usersToIgnore.indexOf(userName);

	if(indexOfUsername != -1)
	{
		//console.log(i, userName, indexOfUsername, linkToUsername);
		if(action == 'hide')
		{
			//console.log(linkToUsername.parentNode.parentNode.parentNode);
			linkToUsername.parentNode.parentNode.parentNode.style['display']= 'none';
		}
	else if(action == 'replace')
		{
			//console.log(linkToUsername.parentNode.parentNode.parentNode);
			linkToUsername.parentNode.parentNode.parentNode.setAttribute('oldInnerHTML', linkToUsername.parentNode.parentNode.parentNode.innerHTML);
			linkToUsername.parentNode.parentNode.parentNode.innerHTML='<tr><td colspan="2"><i>Ignored user ' + userName + '.</i><br /><br /><a onclick="this.parentNode.innerHTML = this.parentNode.getAttribute(\'oldInnerHTML\');"><b>Click to show ' + userName + '&rsquo;s post</b></a>.</td></tr>';
		}
	}
}