var wpNavMenu;(function(b){var a=wpNavMenu={options:{menuItemDepthPerLevel:30,globalMaxDepth:11},menuList:undefined,targetList:undefined,autoCompleteData:{},init:function(){a.menuList=b("#menu-to-edit");a.targetList=a.menuList;this.jQueryExtensions();this.attachMenuEditListeners();this.setupInputWithDefaultTitle();this.attachAddMenuItemListeners();this.attachQuickSearchListeners();this.attachTabsPanelListeners();this.attachHomeLinkListener();if(a.menuList.length){this.initSortables()}this.initToggles();this.initTabManager();this.checkForEmptyMenu()},jQueryExtensions:function(){b.fn.extend({menuItemDepth:function(){return a.pxToDepth(this.eq(0).css("margin-left").slice(0,-2))},updateDepthClass:function(d,c){return this.each(function(){var e=b(this);c=c||e.menuItemDepth();b(this).removeClass("menu-item-depth-"+c).addClass("menu-item-depth-"+d)})},shiftDepthClass:function(c){return this.each(function(){var d=b(this),e=d.menuItemDepth();b(this).removeClass("menu-item-depth-"+e).addClass("menu-item-depth-"+(e+c))})},childMenuItems:function(){var c=b();this.each(function(){var d=b(this),f=d.menuItemDepth(),e=d.next();while(e.length&&e.menuItemDepth()>f){c=c.add(e);e=e.next()}});return c},updateParentMenuItemDBId:function(){return this.each(function(){var e=b(this),c=e.find(".menu-item-data-parent-id"),f=e.menuItemDepth(),d=e.prev();if(f==0){c.val(0)}else{while(d.menuItemDepth()!=f-1){d=d.prev()}c.val(d.find(".menu-item-data-db-id").val())}})},hideAdvancedMenuItemFields:function(){return this.each(function(){var c=b(this);b(".hide-column-tog").not(":checked").each(function(){c.find(".field-"+b(this).val()).addClass("hidden-field")})})},addSelectedToMenu:function(c){return this.each(function(){var e=b(this),d={},g=e.find(".tabs-panel-active .categorychecklist li input:checked"),f=new RegExp("menu-item\\[([^\\]]*)");c=c||a.addMenuItemToBottom;if(!g.length){return false}e.find("img.waiting").show();b(g).each(function(){var h=f.exec(b(this).attr("name")),i="undefined"==typeof h[1]?0:parseInt(h[1],10);d[i]=a.getListDataFromID(i)});a.addItemToMenu(d,c,function(){g.removeAttr("checked");e.find("img.waiting").hide()})})}})},initToggles:function(){postboxes.add_postbox_toggles("nav-menus");columns.useCheckboxesForHidden();columns.checked=function(c){b(".field-"+c).removeClass("hidden-field")};columns.unchecked=function(c){b(".field-"+c).addClass("hidden-field")};a.menuList.hideAdvancedMenuItemFields()},initSortables:function(){var i=0,h,g,c,f=a.menuList.offset().left,j,e;a.menuList.sortable({handle:".menu-item-handle",placeholder:"sortable-placeholder",start:function(r,q){var l,p,o,m,n;e=q.item.children(".menu-item-transport");h=(j)?0:q.item.menuItemDepth();d(q,h);o=(q.item.next()[0]==q.placeholder[0])?q.item.next():q.item;m=o.childMenuItems();e.append(m);k(q);l=e.outerHeight();l+=(l>0)?(q.placeholder.css("margin-top").slice(0,-2)*1):0;l+=q.helper.outerHeight();l-=2;q.placeholder.height(l);n=h;m.each(function(){var s=b(this).menuItemDepth();n=(s>n)?s:n});p=q.helper.find(".menu-item-handle").outerWidth();p+=a.depthToPx(n-h);p-=2;q.placeholder.width(p)},stop:function(o,n){var m,l=i-h;m=e.children().insertAfter(n.item);if(l!=0){n.item.updateDepthClass(i);m.shiftDepthClass(l)}n.item.updateParentMenuItemDBId();a.recalculateMenuItemPositions()},change:function(m,l){if(!l.placeholder.parent().hasClass("menu")){l.placeholder.appendTo(a.menuList)}k(l)},sort:function(m,l){var n=a.pxToDepth(l.helper.offset().left-f);if(n<g){n=g}else{if(n>c){n=c}}if(n!=i){d(l,n)}}});function k(n){var m=n.placeholder.prev(),l=n.placeholder.next(),o;if(m[0]==n.item[0]){m=m.prev()}if(l[0]==n.item[0]){l=l.next()}g=(l.length)?l.menuItemDepth():0;if(m.length){c=((o=m.menuItemDepth()+1)>a.options.globalMaxDepth)?a.options.globalMaxDepth:o}else{c=0}}function d(l,m){l.placeholder.updateDepthClass(m,i);i=m}},attachMenuEditListeners:function(){var c=this;b("#update-nav-menu").bind("click",function(d){if(d.target&&d.target.className){if(-1!=d.target.className.indexOf("item-edit")){return c.eventOnClickEditLink(d.target)}else{if(-1!=d.target.className.indexOf("menu-delete")){return c.eventOnClickMenuDelete(d.target)}else{if(-1!=d.target.className.indexOf("item-delete")){return c.eventOnClickMenuItemDelete(d.target)}else{if(-1!=d.target.className.indexOf("item-close")){return c.eventOnClickCloseLink(d.target)}}}}}})},setupInputWithDefaultTitle:function(){var c="input-with-default-title";b("."+c).each(function(){var f=b(this),e=f.attr("title"),d=f.val();f.data(c,e);if(""==d){f.val(e)}else{if(e==d){return}else{f.removeClass(c)}}}).focus(function(){var d=b(this);if(d.val()==d.data(c)){d.val("").removeClass(c)}}).blur(function(){var d=b(this);if(""==d.val()){d.addClass(c).val(d.data(c))}})},attachAddMenuItemListeners:function(){var c=b("#nav-menu-meta");c.find(".add-to-menu input").click(function(){b(this).trigger("wp-add-menu-item",[a.addMenuItemToBottom]);return false});c.find(".customlinkdiv").bind("wp-add-menu-item",function(f,d){a.addCustomLink(d)});c.find(".posttypediv, .taxonomydiv").bind("wp-add-menu-item",function(f,d){b(this).addSelectedToMenu(d)})},attachQuickSearchListeners:function(){var d=this,c=b("#nav-menu-meta");b("input.quick-search").each(function(e,f){d.setupQuickSearchEventListeners(f)});c.find(".quick-search-submit").click(function(){b(this).trigger("wp-quick-search");return false});c.find(".inside").children().bind("wp-quick-search",function(){d.quickSearch(b(this).attr("id"))})},quickSearch:function(j){var e=b("#"+j+" .quick-search").attr("name"),g=b("#"+j+" .quick-search").val(),i=b("#menu").val(),d=b("#menu-settings-column-nonce").val(),h={},f=this,c=function(){};c=f.processQuickSearchQueryResponse;h={action:"menu-quick-search","response-format":"markup",menu:i,"menu-settings-column-nonce":d,q:g,type:e};b.post(ajaxurl,h,function(k){c.call(f,k,h)})},addCustomLink:function(c){var e=b("#custom-menu-item-url").val(),d=b("#custom-menu-item-name").val();c=c||a.addMenuItemToBottom;if(""==e||"http://"==e){return false}b(".customlinkdiv img.waiting").show();this.addLinkToMenu(e,d,c,function(){b(".customlinkdiv img.waiting").hide();b("#custom-menu-item-name").val("").blur();b("#custom-menu-item-url").val("http://")})},addLinkToMenu:function(e,d,c,f){c=c||a.addMenuItemToBottom;f=f||function(){};a.addItemToMenu({"-1":{"menu-item-type":"custom","menu-item-url":e,"menu-item-title":d}},c,f)},addItemToMenu:function(e,c,g){var f=b("#menu").val(),d=b("#menu-settings-column-nonce").val();c=c||function(){};g=g||function(){};params={action:"add-menu-item",menu:f,"menu-settings-column-nonce":d,"menu-item":e};b.post(ajaxurl,params,function(h){c(h,params);g()})},addMenuItemToBottom:function(c,d){b(c).hideAdvancedMenuItemFields().appendTo(a.targetList)},addMenuItemToTop:function(c,d){b(c).hideAdvancedMenuItemFields().prependTo(a.targetList)},attachHomeLinkListener:function(){b(".add-home-link",".customlinkdiv").click(function(c){a.addLinkToMenu(navMenuL10n.homeurl,navMenuL10n.home,a.addMenuItemToTop,a.recalculateMenuItemPositions);return false})},attachTabsPanelListeners:function(){b("#menu-settings-column").bind("click",function(j){var h,k,d,l,c,g,f;if(j.target&&j.target.className&&-1!=j.target.className.indexOf("nav-tab-link")){d=/#(.*)$/.exec(j.target.href);l=b(j.target).parents(".inside").first()[0];c=l?l.getElementsByTagName("input"):[];g=c.length;while(g--){c[g].checked=false}b(".tabs-panel",l).each(function(){if(this.className){this.className=this.className.replace("tabs-panel-active","tabs-panel-inactive")}});b(".tabs",l).each(function(){this.className=this.className.replace("tabs","")});j.target.parentNode.className+=" tabs";if(d&&d[1]){k=document.getElementById(d[1]);if(k){k.className=k.className.replace("tabs-panel-inactive","tabs-panel-active")}}return false}else{if(j.target&&j.target.className&&-1!=j.target.className.indexOf("select-all")){h=/#(.*)$/.exec(j.target.href);if(h&&h[1]){f=b("#"+h[1]+" .tabs-panel-active .menu-item-title input");if(f.length===f.filter(":checked").length){f.removeAttr("checked")}else{f.attr("checked","checked")}return false}}}})},initTabManager:function(){var h=b(".nav-tabs-wrapper"),i=h.children(".nav-tabs"),g=i.children(".nav-tab-active"),l=i.children(".nav-tab"),e=0,m,f,k,d,j=false;function c(){f=h.offset().left;m=f+h.width();g.makeTabVisible()}b.fn.extend({makeTabVisible:function(){var o=this.eq(0),p,n;if(!o.length){return}p=o.offset().left;n=p+o.outerWidth();if(n>m){i.animate({"margin-left":"+="+(m-n)+"px"},"fast")}else{if(p<f){i.animate({"margin-left":"-="+(p-f)+"px"},"fast")}}return o},isTabVisible:function(){var o=this.eq(0),p=o.offset().left,n=p+o.outerWidth();return(n<=m&&p>=f)?true:false}});l.each(function(){e+=b(this).outerWidth(true)});if(e<=h.width()-i.css("padding-left").slice(0,-2)-i.css("padding-right").slice(0,-2)){return}i.css({"margin-right":(-1*e)+"px",padding:0});k=b('<div class="nav-tabs-arrow nav-tabs-arrow-left"><a>&laquo;</a></div>');d=b('<div class="nav-tabs-arrow nav-tabs-arrow-right"><a>&raquo;</a></div>');h.wrap('<div class="nav-tabs-nav"/>').parent().prepend(k).append(d);c();b(window).resize(function(){if(j){return}j=true;setTimeout(function(){c();j=false},1000)});b.each([{arrow:k,next:"next",last:"first",operator:"+="},{arrow:d,next:"prev",last:"last",operator:"-="}],function(){var n=this;this.arrow.mousedown(function(){var p=l[n.last](),o=function(){if(!p.isTabVisible()){i.animate({"margin-left":n.operator+"90px"},300,"linear",o)}};o()}).mouseup(function(){var p,o;i.stop(true);p=l[n.last]();while((o=p[n.next]())&&o.length&&!o.isTabVisible()){p=o}p.makeTabVisible()})})},setupQuickSearchEventListeners:function(c){var d=this;b(c).autocomplete(ajaxurl+"?action=menu-quick-search&type="+c.name,{delay:500,formatItem:a.formatAutocompleteResponse,formatResult:a.formatAutocompleteResult,minchars:2,multiple:false}).bind("blur",function(h){var f=a.autoCompleteData[this.value],g=this;if(f){b.post(ajaxurl+"?action=menu-quick-search&type=get-post-item&response-format=markup",f,function(e){d.processQuickSearchQueryResponse.call(d,e,f);a.autoCompleteData[g.value]=false})}})},eventOnClickEditLink:function(c){var e,d=/#(.*)$/.exec(c.href);if(d&&d[1]){e=b("#"+d[1]);if(0!=e.length){if(e.hasClass("menu-item-edit-inactive")){e.slideDown("fast").siblings("dl").andSelf().removeClass("menu-item-edit-inactive").addClass("menu-item-edit-active")}else{e.slideUp("fast").siblings("dl").andSelf().removeClass("menu-item-edit-active").addClass("menu-item-edit-inactive")}return false}}},eventOnClickCloseLink:function(c){b(c).closest(".menu-item-settings").siblings("dl").find(".item-edit").click();return false},eventOnClickMenuDelete:function(c){if(confirm(navMenuL10n.warnDeleteMenu)){return true}else{return false}},eventOnClickMenuItemDelete:function(c){var f,e,d=this;if(confirm(navMenuL10n.warnDeleteMenuItem)){e=/_wpnonce=([a-zA-Z0-9]*)$/.exec(c.href);if(e&&e[1]){f=parseInt(c.id.replace("delete-",""),10);b.post(ajaxurl,{action:"delete-menu-item","menu-item":f,_wpnonce:e[1]},function(g){if("1"==g){d.removeMenuItem(document.getElementById("menu-item-"+f))}});return false}return true}else{return false}},processQuickSearchQueryResponse:function(g,m){if(!m){m={}}var d=document.createElement("ul"),c=document.getElementById("nav-menu-meta"),h,l,e,n,j,k=new RegExp("menu-item\\[([^\\]]*)"),f;e=k.exec(g);if(e&&e[1]){j=e[1];while(c.elements["menu-item["+j+"][menu-item-type]"]){j--}if(j!=e[1]){g=g.replace(new RegExp("menu-item\\["+e[1]+"\\]","g"),"menu-item["+j+"]")}}d.innerHTML=g;l=d.getElementsByTagName("li");if(l[0]&&m.object_type){f=document.getElementById(m.object_type+"-search-checklist");if(f){f.appendChild(l[0])}}else{if(m.type){e=/quick-search-(posttype|taxonomy)-([a-zA-Z_-]*)/.exec(m.type);if(e&&e[2]){f=document.getElementById(e[2]+"-search-checklist");if(f){h=l.length;if(!h){n=document.createElement("li");n.appendChild(document.createTextNode(navMenuL10n.noResultsFound));f.appendChild(n)}while(h--){f.appendChild(l[h])}}}}}},removeMenuItem:function(d){d=b(d);var c=d.childMenuItems(),e=this;d.addClass("deleting").fadeOut(350,function(){d.remove();c.shiftDepthClass(-1).updateParentMenuItemDBId();a.recalculateMenuItemPositions();e.checkForEmptyMenu()})},checkForEmptyMenu:function(){if(a.menuList.children().length){return}a.menuList.height(80).one("sortstop",function(){b(this).height("auto")})},formatAutocompleteResponse:function(c,g,d,f){if(c&&c[0]){var e=b.parseJSON(c[0]);if(e.post_title){if(e.ID&&e.post_type){a.autoCompleteData[e.post_title]={ID:e.ID,object_type:e.post_type}}return e.post_title}}},formatAutocompleteResult:function(c,g,d,f){if(c&&c[0]){var e=b.parseJSON(c[0]);if(e.post_title){return e.post_title}}},getListDataFromID:function(k,h){if(!k){return false}h=h||document;var d=["menu-item-db-id","menu-item-object-id","menu-item-object","menu-item-parent-id","menu-item-position","menu-item-type","menu-item-append","menu-item-title","menu-item-url","menu-item-description","menu-item-attr-title","menu-item-target","menu-item-classes","menu-item-xfn"],c={},e=h.getElementsByTagName("input"),g=e.length,f;while(g--){f=d.length;while(f--){if(e[g]&&e[g].name&&"menu-item["+k+"]["+d[f]+"]"==e[g].name){c[d[f]]=e[g].value}}}return c},recalculateMenuItemPositions:function(){a.menuList.find(".menu-item-data-position").val(function(c){return c+1})},depthToPx:function(c){return c*a.options.menuItemDepthPerLevel},pxToDepth:function(c){return Math.floor(c/a.options.menuItemDepthPerLevel)}};b(document).ready(function(){wpNavMenu.init()})})(jQuery);