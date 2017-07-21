<h1>Registration Verify Code</h1>
<hr />

<form>
	<p>
		[[verify-code:admin-info]]
		<b style="color:green;">[[verify-code:admin-info-beta]]</b>
	</p><br />
	<div>
		<p>
			<label for="Width">[[verify-code:admin-width-label]]verify-code</label>
			<input type="text" data-field="v-code:width" title="Width" class="form-control" placeholder="[[admin-width-placeholder]]"><br />
			<label for="Height">[[verify-code:admin-height-label]]verify-code</label>
			<input type="text" data-field="v-code:height" title="Height" class="form-control" placeholder="[[admin-height-placeholder]]">
            <label for="Length">[[verify-code:admin-length-label]]verify-code</label>
			<input type="text" data-field="v-code:leng" title="Length" class="form-control" placeholder="[[admin-length-placeholder]]">
		</p>
	</div>
</form>

<button class="btn btn-lg btn-primary" id="save">[[verify-code:admin-save]]</button>

<script>
	require(['admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>