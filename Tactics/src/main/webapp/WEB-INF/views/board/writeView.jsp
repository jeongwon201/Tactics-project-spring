<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
	 	<title>게시판</title>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	
	<script type="text/javascript">
		$(document).ready(function(){
			var formObj = $("form[name='writeForm']");
			$(".write_btn").on("click", function(){
				if(fn_valiChk()){
					return false;
				}
				formObj.attr("action", "/board/write");
				formObj.attr("method", "post");
				formObj.submit();
			});
		})
		function fn_valiChk(){
			var regForm = $("form[name='writeForm'] .chk").length;
			for(var i = 0; i<regForm; i++){
				if($(".chk").eq(i).val() == "" || $(".chk").eq(i).val() == null){
					alert($(".chk").eq(i).attr("title"));
					return true;
				}
			}
		}
	</script>
	
	<body>
	
		<%@include file="../header.jsp" %>
	
		<main>
	
			<section id="container" class="container">
			
			<%@include file="nav.jsp" %>
				
				<form name="writeForm" method="post" action="/board/write" class="form-horizontal">
					<c:if test="${member.userId != null}">
						<div class="form-group">
							<label for="title" class="control-label">제목</label>
							<input type="text" id="title" name="title" class="chk form-control" title="제목을 입력하세요."/>
						</div>
						<div class="form-group">
							<label for="content" class="control-label">내용</label>
							<textarea id="content" name="content" class="chk form-control" title="내용을 입력하세요."></textarea>
						</div>
						<div class="form-group">
							<label for="writer" class="control-label">작성자</label>
							<input type="text" id="writer" name="writer" class=" chk form-control" title="작성자를 입력하세요." value="${member.userId}" readonly="readonly"/>
						</div>
						<div class="form-group">
							<button class="write_btn btn btn-success" type="submit">작성</button>	
						</div>
					</c:if>
							<c:if test="${member.userId == null}">
								<p class="lead">로그인 후에 작성하실 수 있습니다.</p>
							</c:if>
							
				</form>
				
			</section>
			<hr />
			
		</main>
		
		<%@ include file="../footer.jsp" %>
		
	</body>
</html>