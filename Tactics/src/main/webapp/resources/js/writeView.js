function btnSubmit() {
	if ($("#select-tactics option:selected").val() == "전술을 선택하세요.") {
		alert("전술을 선택하세요.");
		return false;
	}
	if ($("#title").val() == "") {
		alert("제목을 입력하세요.");
		return false;
	}
	if ($("#content").val() == "") {
		alert("내용을 입력하세요.");
		return false;
	}
	var title = $("#title").val();
	var content = $("#content").val();
	var tacticsTitle = $("#select-tactics option:selected").val();
	$.ajax({
		url: '/board/write',
		type: 'post',
		data: { title : title, content : content, tacticsTitle : tacticsTitle },
		dataType: 'json',
		success: function(result) {
			if (result == 1) {
				alert('작성이 완료되었습니다.');
				location.href = "/board/list";
			}
		},
		error: function(error) {
			alert('AJAX ERROR, ' + error);
		}
	});
}
