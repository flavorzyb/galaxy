define(["utils/utils","mvc/upload/upload-model","mvc/upload/upload-settings","mvc/ui/ui-popover","mvc/ui/ui-select"],function(a,b,c,d,e){return Backbone.View.extend({options:{padding:8},status_classes:{init:"upload-icon-button fa fa-trash-o",queued:"upload-icon fa fa-spinner fa-spin",running:"upload-icon fa fa-spinner fa-spin",success:"upload-icon-button fa fa-check",error:"upload-icon-button fa fa-exclamation-triangle"},settings:null,select_genome:null,select_extension:null,initialize:function(a,c){this.app=a;var f=this;this.model=new b.Model(c),this.setElement(this._template(c)),this.settings=new d.View({title:"Upload configuration",container:this.$("#settings"),placement:"bottom"});var g=this.app.select_genome.value();this.select_genome=new e.View({css:"genome",onchange:function(a){f.model.set("genome",a),f.app.updateGenome(a,!0)},data:f.app.list_genomes,container:this.$("#genome"),value:g}),this.model.set("genome",g);var h=this.app.select_extension.value();this.select_extension=new e.View({css:"extension",onchange:function(a){f.model.set("extension",a),f.app.updateExtension(a,!0)},data:f.app.list_extensions,container:this.$("#extension"),value:h}),this.model.set("extension",h),this.$("#symbol").on("click",function(){f._removeRow()}),this.$("#extension-info").on("click",function(a){f.app.showExtensionInfo({$el:$(a.target),title:f.select_extension.text(),extension:f.select_extension.value()})}).on("mousedown",function(a){a.preventDefault()}),this.$("#settings").on("click",function(){f._showSettings()}).on("mousedown",function(a){a.preventDefault()}),this.$("#text-content").on("keyup",function(a){f.model.set("url_paste",$(a.target).val()),f.model.set("file_size",$(a.target).val().length)}),this.model.on("change:percentage",function(){f._refreshPercentage()}),this.model.on("change:status",function(){f._refreshStatus()}),this.model.on("change:info",function(){f._refreshInfo()}),this.model.on("change:genome",function(){f._refreshGenome()}),this.model.on("change:extension",function(){f._refreshExtension()}),this.model.on("change:file_size",function(){f._refreshFileSize()}),this.model.on("remove",function(){f.remove()}),this.app.collection.on("reset",function(){f.remove()})},render:function(){var b=this.model.get("file_name"),c=this.model.get("file_size"),d=this.model.get("file_mode");if(this.$("#title").html(b),this.$("#size").html(a.bytesToString(c)),this.$("#mode").removeClass().addClass("mode").addClass("text-primary"),"new"==d){var e=this.$("#text"),f=this.options.padding,g=this.$el.width()-2*f,h=this.$el.height()-f;e.css("width",g+"px"),e.css("top",h+"px"),this.$el.height(h+e.height()+2*f),e.show(),this.$("#mode").addClass("fa fa-pencil")}"local"==d&&this.$("#mode").addClass("fa fa-laptop"),"ftp"==d&&this.$("#mode").addClass("fa fa-code-fork")},remove:function(){this.select_genome.remove(),this.select_extension.remove(),Backbone.View.prototype.remove.apply(this)},_refreshExtension:function(){this.select_extension.value(this.model.get("extension"))},_refreshGenome:function(){this.select_genome.value(this.model.get("genome"))},_refreshInfo:function(){var a=this.model.get("info");a?this.$("#info").html("<strong>Failed: </strong>"+a).show():this.$("#info").hide()},_refreshPercentage:function(){var a=parseInt(this.model.get("percentage"));this.$(".progress-bar").css({width:a+"%"}),this.$("#percentage").html(100!=a?a+"%":"Adding to history...")},_refreshStatus:function(){var a=this.model.get("status");this.$("#symbol").removeClass().addClass(this.status_classes[a]),this.$("#text-content").attr("disabled","init"!=a),"init"==a?(this.select_genome.enable(),this.select_extension.enable()):(this.select_genome.disable(),this.select_extension.disable()),"success"==a&&(this.$el.addClass("success"),this.$("#percentage").html("100%")),"error"==a&&(this.$el.addClass("danger"),this.$(".progress").remove())},_refreshFileSize:function(){var b=this.model.get("file_size");this.$("#size").html(a.bytesToString(b))},_removeRow:function(){var a=this.model.get("status");("init"==a||"success"==a||"error"==a)&&this.app.collection.remove(this.model)},_showSettings:function(){this.settings.visible?this.settings.hide():(this.settings.empty(),this.settings.append(new c(this).$el),this.settings.show())},_template:function(a){return'<tr id="upload-item-'+a.id+'" class="upload-item"><td><div class="title-column"><div id="mode"/><div id="title" class="title"/><div id="text" class="text"><div class="text-info">You can tell Galaxy to download data from web by entering URL in this box (one per line). You can also directly paste the contents of a file.</div><textarea id="text-content" class="text-content form-control"/></div></div></td><td><div id="size" class="size"/></td><td><div id="extension" class="extension" style="float: left;"/>&nbsp;&nbsp<div id="extension-info" class="upload-icon-button fa fa-search"/></td><td><div id="genome" class="genome"/></td><td><div id="settings" class="upload-icon-button fa fa-gear"/></td><td><div id="info" class="info"><div class="progress"><div class="progress-bar progress-bar-success"/><div id="percentage" class="percentage">0%</div></div></div></td><td><div id="symbol" class="'+this.status_classes.init+'"/></td></tr>'}})});
//# sourceMappingURL=../../../../maps/mvc/upload/default/default-row.js.map