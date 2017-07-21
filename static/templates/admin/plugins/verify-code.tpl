<h1>Registration Verify Code</h1>
<hr />

<form>
	<p>
		Enter some setting for generating code.
		<b style="color:green;">这是一个测试插件，功能仍未完善，目前设置无效，请等待完善。</b>
	</p><br />
	<div>
		<p>
			<label for="Width">Code Image Width</label>
			<input type="text" data-field="v-code:width" title="Width" class="form-control" placeholder="width e.g 100(.px)"><br />
			<label for="Height">Code Image Height</label>
			<input type="text" data-field="v-code:height" title="Height" class="form-control" placeholder="height e.g 40(.px)">
            <label for="Length">Code Image Length</label>
			<input type="text" data-field="v-code:length" title="Length" class="form-control" placeholder="Length e.g 4">
		</p>
	</div>
</form>

<button class="btn btn-lg btn-primary" id="save">Save</button>

<script>
	require(['admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>