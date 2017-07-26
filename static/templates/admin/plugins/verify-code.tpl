<h1>Registration Verify Code</h1>
<hr />

<form>
	<p>
		[[verify-code:admin-info]]
		<b style="color:green;">[[verify-code:admin-info-beta]]</b>
	</p><br />
	<div>
		<p>
			<label for="Width">[[verify-code:admin-width-label]]</label>
			<input type="text" data-field="v-code:width" title="Width" class="form-control" placeholder="[[verify-code:admin-width-placeholder]]"><br />
			<label for="Height">[[verify-code:admin-height-label]]</label>
			<input type="text" data-field="v-code:height" title="Height" class="form-control" placeholder="[[verify-code:admin-height-placeholder]]">
            <label for="Length">[[verify-code:admin-length-label]]</label>
			<input type="text" data-field="v-code:leng" title="Length" class="form-control" placeholder="[[verify-code:admin-length-placeholder]]">
			<label for="Width">[[verify-code:admin-font-size]]</label>
			<input type="text" data-field="v-code:font_size" title="Font Size" class="form-control" placeholder="[[verify-code:admin-font-size-e]]"><br />
			<label for="Height">[[verify-code:admin-font-style]]</label>
			<input type="text" data-field="v-code:font_style" title="Font Style" class="form-control" placeholder="[[verify-code:admin-font-style-e]]">
            <label for="Length">[[verify-code:admin-point-num]]</label>
			<input type="text" data-field="v-code:point" title="Point Number" class="form-control" placeholder="[[verify-code:admin-point-num-e]]">
			<label for="Length">[[verify-code:admin-line-num]]</label>
			<input type="text" data-field="v-code:line_num" title="Line Number" class="form-control" placeholder="[[verify-code:admin-line-num-e]]">
			<label for="Length">[[verify-code:admin-line-style]]</label>
			<input type="text" data-field="v-code:line_style" title="Line Style" class="form-control" placeholder="[[verify-code:admin-line-style-e]]">
		</p>
	</div>
</form>

<button class="btn btn-lg btn-primary" id="save">[[verify-code:admin-save]]</button>

<script>
	require(['admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>
