var tagBox,commentsBox,editPermalink,makeSlugeditClickable,WPSetThumbnailHTML,WPSetThumbnailID,WPRemoveThumbnail,wptitlehint;function array_unique_noempty(b){var c=[];jQuery.each(b,function(a,d){d=jQuery.trim(d);if(d&&jQuery.inArray(d,c)==-1){c.push(d)}});return c}(function(a){tagBox={clean:function(c){var b=postL10n.comma;if(","!==b){c=c.replace(new RegExp(b,"g"),",")}c=c.replace(/\s*,\s*/g,",").replace(/,+/g,",").replace(/[,\s]+$/,"").replace(/^[,\s]+/,"");if(","!==b){c=c.replace(/,/g,b)}return c},parseTags:function(f){var i=f.id,c=i.split("-check-num-")[1],e=a(f).closest(".tagsdiv"),h=e.find(".the-tags"),b=postL10n.comma,d=h.val().split(b),g=[];delete d[c];a.each(d,function(j,k){k=a.trim(k);if(k){g.push(k)}});h.val(this.clean(g.join(b)));this.quickClicks(e);return false},quickClicks:function(d){var g=a(".the-tags",d),e=a(".tagchecklist",d),f=a(d).attr("id"),b,c;if(!g.length){return}c=g.prop("disabled");b=g.val().split(postL10n.comma);e.empty();a.each(b,function(i,k){var j,h;k=a.trim(k);if(!k){return}j=a("<span />").text(k);if(!c){h=a('<a id="'+f+"-check-num-"+i+'" class="ntdelbutton">X</a>');h.click(function(){tagBox.parseTags(this)});j.prepend("&nbsp;").prepend(h)}e.append(j)})},flushTags:function(g,c,h){c=c||false;var d=a(".the-tags",g),j=a("input.newtag",g),b=postL10n.comma,e,i;i=c?a(c).text():j.val();tagsval=d.val();e=tagsval?tagsval+b+i:i;e=this.clean(e);e=array_unique_noempty(e.split(b)).join(b);d.val(e);this.quickClicks(g);if(!c){j.val("")}if("undefined"==typeof(h)){j.focus()}return false},get:function(c){var b=c.substr(c.indexOf("-")+1);a.post(ajaxurl,{action:"get-tagcloud",tax:b},function(e,d){if(0==e||"success"!=d){e=wpAjax.broken}e=a('<p id="tagcloud-'+b+'" class="the-tagcloud">'+e+"</p>");a("a",e).click(function(){tagBox.flushTags(a(this).closest(".inside").children(".tagsdiv"),this);return false});a("#"+c).after(e)})},init:function(){var b=this,c=a("div.ajaxtag");a(".tagsdiv").each(function(){tagBox.quickClicks(this)});a("input.tagadd",c).click(function(){b.flushTags(a(this).closest(".tagsdiv"))});a("div.taghint",c).click(function(){a(this).css("visibility","hidden").parent().siblings(".newtag").focus()});a("input.newtag",c).blur(function(){if(this.value==""){a(this).parent().siblings(".taghint").css("visibility","")}}).focus(function(){a(this).parent().siblings(".taghint").css("visibility","hidden")}).keyup(function(d){if(13==d.which){tagBox.flushTags(a(this).closest(".tagsdiv"));return false}}).keypress(function(d){if(13==d.which){d.preventDefault();return false}}).each(function(){var d=a(this).closest("div.tagsdiv").attr("id");a(this).suggest(ajaxurl+"?action=ajax-tag-search&tax="+d,{delay:500,minchars:2,multiple:true,multipleSep:postL10n.comma+" "})});a("#post").submit(function(){a("div.tagsdiv").each(function(){tagBox.flushTags(this,false,1)})});a("a.tagcloud-link").click(function(){tagBox.get(a(this).attr("id"));a(this).unbind().click(function(){a(this).siblings(".the-tagcloud").toggle();return false});return false})}};commentsBox={st:0,get:function(d,c){var b=this.st,e;if(!c){c=20}this.st+=c;this.total=d;a("#commentsdiv img.waiting").show();e={action:"get-comments",mode:"single",_ajax_nonce:a("#add_comment_nonce").val(),p:a("#post_ID").val(),start:b,number:c};a.post(ajaxurl,e,function(f){f=wpAjax.parseAjaxResponse(f);a("#commentsdiv .widefat").show();a("#commentsdiv img.waiting").hide();if("object"==typeof f&&f.responses[0]){a("#the-comment-list").append(f.responses[0].data);theList=theExtraList=null;a("a[className*=':']").unbind();if(commentsBox.st>commentsBox.total){a("#show-comments").hide()}else{a("#show-comments").show().children("a").html(postL10n.showcomm)}return}else{if(1==f){a("#show-comments").html(postL10n.endcomm);return}}a("#the-comment-list").append('<tr><td colspan="2">'+wpAjax.broken+"</td></tr>")});return false}};WPSetThumbnailHTML=function(b){a(".inside","#postimagediv").html(b)};WPSetThumbnailID=function(c){var b=a('input[value="_thumbnail_id"]',"#list-table");if(b.size()>0){a("#meta\\["+b.attr("id").match(/[0-9]+/)+"\\]\\[value\\]").text(c)}};WPRemoveThumbnail=function(b){a.post(ajaxurl,{action:"set-post-thumbnail",post_id:a("#post_ID").val(),thumbnail_id:-1,_ajax_nonce:b,cookie:encodeURIComponent(document.cookie)},function(c){if(c=="0"){alert(setPostThumbnailL10n.error)}else{WPSetThumbnailHTML(c)}})}})(jQuery);jQuery(document).ready(function(f){var b,a,g="",e=0,h=f("#content");postboxes.add_postbox_toggles(pagenow);if(f("#tagsdiv-post_tag").length){tagBox.init()}else{f("#side-sortables, #normal-sortables, #advanced-sortables").children("div.postbox").each(function(){if(this.id.indexOf("tagsdiv-")===0){tagBox.init();return false}})}f(".categorydiv").each(function(){var n=f(this).attr("id"),j=false,m,o,l,i,k;l=n.split("-");l.shift();i=l.join("-");k=i+"_tab";if(i=="category"){k="cats"}f("a","#"+i+"-tabs").click(function(){var p=f(this).attr("href");f(this).parent().addClass("tabs").siblings("li").removeClass("tabs");f("#"+i+"-tabs").siblings(".tabs-panel").hide();f(p).show();if("#"+i+"-all"==p){deleteUserSetting(k)}else{setUserSetting(k,"pop")}return false});if(getUserSetting(k)){f('a[href="#'+i+'-pop"]',"#"+i+"-tabs").click()}f("#new"+i).one("focus",function(){f(this).val("").removeClass("form-input-tip")});f("#"+i+"-add-submit").click(function(){f("#new"+i).focus()});m=function(){if(j){return}j=true;var p=jQuery(this),r=p.is(":checked"),q=p.val().toString();f("#in-"+i+"-"+q+", #in-"+i+"-category-"+q).prop("checked",r);j=false};catAddBefore=function(p){if(!f("#new"+i).val()){return false}p.data+="&"+f(":checked","#"+i+"checklist").serialize();f("#"+i+"-add-submit").prop("disabled",true);return p};o=function(u,t){var q,p=f("#new"+i+"_parent");f("#"+i+"-add-submit").prop("disabled",false);if("undefined"!=t.parsed.responses[0]&&(q=t.parsed.responses[0].supplemental.newcat_parent)){p.before(q);p.remove()}};f("#"+i+"checklist").wpList({alt:"",response:i+"-ajax-response",addBefore:catAddBefore,addAfter:o});f("#"+i+"-add-toggle").click(function(){f("#"+i+"-adder").toggleClass("wp-hidden-children");f('a[href="#'+i+'-all"]',"#"+i+"-tabs").click();f("#new"+i).focus();return false});f("#"+i+"checklist li.popular-category :checkbox, #"+i+"checklist-pop :checkbox").live("click",function(){var p=f(this),r=p.is(":checked"),q=p.val();if(q&&p.parents("#taxonomy-"+i).length){f("#in-"+i+"-"+q+", #in-popular-"+i+"-"+q).prop("checked",r)}})});if(f("#postcustom").length){f("#the-list").wpList({addAfter:function(i,j){f("table#list-table").show()},addBefore:function(i){i.data+="&post_id="+f("#post_ID").val();return i}})}if(f("#submitdiv").length){b=f("#timestamp").html();a=f("#post-visibility-display").html();function d(){var i=f("#post-visibility-select");if(f("input:radio:checked",i).val()!="public"){f("#sticky").prop("checked",false);f("#sticky-span").hide()}else{f("#sticky-span").show()}if(f("input:radio:checked",i).val()!="password"){f("#password-span").hide()}else{f("#password-span").show()}}function c(){var p,q,j,s,r=f("#post_status"),k=f('option[value="publish"]',r),i=f("#aa").val(),n=f("#mm").val(),o=f("#jj").val(),m=f("#hh").val(),l=f("#mn").val();p=new Date(i,n-1,o,m,l);q=new Date(f("#hidden_aa").val(),f("#hidden_mm").val()-1,f("#hidden_jj").val(),f("#hidden_hh").val(),f("#hidden_mn").val());j=new Date(f("#cur_aa").val(),f("#cur_mm").val()-1,f("#cur_jj").val(),f("#cur_hh").val(),f("#cur_mn").val());if(p.getFullYear()!=i||(1+p.getMonth())!=n||p.getDate()!=o||p.getMinutes()!=l){f(".timestamp-wrap","#timestampdiv").addClass("form-invalid");return false}else{f(".timestamp-wrap","#timestampdiv").removeClass("form-invalid")}if(p>j&&f("#original_post_status").val()!="future"){s=postL10n.publishOnFuture;f("#publish").val(postL10n.schedule)}else{if(p<=j&&f("#original_post_status").val()!="publish"){s=postL10n.publishOn;f("#publish").val(postL10n.publish)}else{s=postL10n.publishOnPast;f("#publish").val(postL10n.update)}}if(q.toUTCString()==p.toUTCString()){f("#timestamp").html(b)}else{f("#timestamp").html(s+" <b>"+f('option[value="'+f("#mm").val()+'"]',"#mm").text()+" "+o+", "+i+" @ "+m+":"+l+"</b> ")}if(f("input:radio:checked","#post-visibility-select").val()=="private"){f("#publish").val(postL10n.update);if(k.length==0){r.append('<option value="publish">'+postL10n.privatelyPublished+"</option>")}else{k.html(postL10n.privatelyPublished)}f('option[value="publish"]',r).prop("selected",true);f(".edit-post-status","#misc-publishing-actions").hide()}else{if(f("#original_post_status").val()=="future"||f("#original_post_status").val()=="draft"){if(k.length){k.remove();r.val(f("#hidden_post_status").val())}}else{k.html(postL10n.published)}if(r.is(":hidden")){f(".edit-post-status","#misc-publishing-actions").show()}}f("#post-status-display").html(f("option:selected",r).text());if(f("option:selected",r).val()=="private"||f("option:selected",r).val()=="publish"){f("#save-post").hide()}else{f("#save-post").show();if(f("option:selected",r).val()=="pending"){f("#save-post").show().val(postL10n.savePending)}else{f("#save-post").show().val(postL10n.saveDraft)}}return true}f(".edit-visibility","#visibility").click(function(){if(f("#post-visibility-select").is(":hidden")){d();f("#post-visibility-select").slideDown("fast");f(this).hide()}return false});f(".cancel-post-visibility","#post-visibility-select").click(function(){f("#post-visibility-select").slideUp("fast");f("#visibility-radio-"+f("#hidden-post-visibility").val()).prop("checked",true);f("#post_password").val(f("#hidden_post_password").val());f("#sticky").prop("checked",f("#hidden-post-sticky").prop("checked"));f("#post-visibility-display").html(a);f(".edit-visibility","#visibility").show();c();return false});f(".save-post-visibility","#post-visibility-select").click(function(){var i=f("#post-visibility-select");i.slideUp("fast");f(".edit-visibility","#visibility").show();c();if(f("input:radio:checked",i).val()!="public"){f("#sticky").prop("checked",false)}if(true==f("#sticky").prop("checked")){g="Sticky"}else{g=""}f("#post-visibility-display").html(postL10n[f("input:radio:checked",i).val()+g]);return false});f("input:radio","#post-visibility-select").change(function(){d()});f("#timestampdiv").siblings("a.edit-timestamp").click(function(){if(f("#timestampdiv").is(":hidden")){f("#timestampdiv").slideDown("fast");f(this).hide()}return false});f(".cancel-timestamp","#timestampdiv").click(function(){f("#timestampdiv").slideUp("fast");f("#mm").val(f("#hidden_mm").val());f("#jj").val(f("#hidden_jj").val());f("#aa").val(f("#hidden_aa").val());f("#hh").val(f("#hidden_hh").val());f("#mn").val(f("#hidden_mn").val());f("#timestampdiv").siblings("a.edit-timestamp").show();c();return false});f(".save-timestamp","#timestampdiv").click(function(){if(c()){f("#timestampdiv").slideUp("fast");f("#timestampdiv").siblings("a.edit-timestamp").show()}return false});f("#post-status-select").siblings("a.edit-post-status").click(function(){if(f("#post-status-select").is(":hidden")){f("#post-status-select").slideDown("fast");f(this).hide()}return false});f(".save-post-status","#post-status-select").click(function(){f("#post-status-select").slideUp("fast");f("#post-status-select").siblings("a.edit-post-status").show();c();return false});f(".cancel-post-status","#post-status-select").click(function(){f("#post-status-select").slideUp("fast");f("#post_status").val(f("#hidden_post_status").val());f("#post-status-select").siblings("a.edit-post-status").show();c();return false})}if(f("#edit-slug-box").length){editPermalink=function(j){var k,n=0,m=f("#editable-post-name"),o=m.html(),r=f("#post_name"),s=r.val(),p=f("#edit-slug-buttons"),q=p.html(),l=f("#editable-post-name-full").html();f("#view-post-btn").hide();p.html('<a href="#" class="save button">'+postL10n.ok+'</a> <a class="cancel" href="#">'+postL10n.cancel+"</a>");p.children(".save").click(function(){var i=m.children("input").val();if(i==f("#editable-post-name-full").text()){return f(".cancel","#edit-slug-buttons").click()}f.post(ajaxurl,{action:"sample-permalink",post_id:j,new_slug:i,new_title:f("#title").val(),samplepermalinknonce:f("#samplepermalinknonce").val()},function(t){f("#edit-slug-box").html(t);p.html(q);r.val(i);makeSlugeditClickable();f("#view-post-btn").show()});return false});f(".cancel","#edit-slug-buttons").click(function(){f("#view-post-btn").show();m.html(o);p.html(q);r.val(s);return false});for(k=0;k<l.length;++k){if("%"==l.charAt(k)){n++}}slug_value=(n>l.length/4)?"":l;m.html('<input type="text" id="new-post-slug" value="'+slug_value+'" />').children("input").keypress(function(t){var i=t.keyCode||0;if(13==i){p.children(".save").click();return false}if(27==i){p.children(".cancel").click();return false}r.val(this.value)}).focus()};makeSlugeditClickable=function(){f("#editable-post-name").click(function(){f("#edit-slug-buttons").children(".edit-slug").click()})};makeSlugeditClickable()}if(typeof(wpWordCount)!="undefined"){f(document).triggerHandler("wpcountwords",[h.val()]);h.keyup(function(j){var i=j.keyCode||j.charCode;if(i==e){return true}if(13==i||8==e||46==e){f(document).triggerHandler("wpcountwords",[h.val()])}e=i;return true})}wptitlehint=function(k){k=k||"title";var i=f("#"+k),j=f("#"+k+"-prompt-text");if(i.val()==""){j.removeClass("screen-reader-text")}j.click(function(){f(this).addClass("screen-reader-text");i.focus()});i.blur(function(){if(this.value==""){j.removeClass("screen-reader-text")}}).focus(function(){j.addClass("screen-reader-text")}).keydown(function(l){j.addClass("screen-reader-text");f(this).unbind(l)})};wptitlehint()});