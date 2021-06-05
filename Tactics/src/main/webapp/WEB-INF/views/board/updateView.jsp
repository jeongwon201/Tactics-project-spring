<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
	<head>
	 	<title>전술 게시판</title>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	
	<script type="text/javascript">
		$(document).ready(function(){
			var formObj = $("form[name='updateForm']");
			
			$(".cancel_btn").on("click", function(){
				event.preventDefault();
				location.href = "/board/readView?bno=${update.bno}"
					   + "&page=${scri.page}"
					   + "&perPageNum=${scri.perPageNum}"
					   + "&searchType=${scri.searchType}"
					   + "&keyword=${scri.keyword}";
			})
			
			$(".update_btn").on("click", function(){
				if(fn_valiChk()){
					return false;
				}
				formObj.attr("action", "/board/update");
				formObj.attr("method", "post");
				formObj.submit();
			})
		})
			
		function fn_valiChk(){
			var updateForm = $("form[name='updateForm'] .chk").length;
			for(var i = 0; i<updateForm; i++){
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
			<div id="root" class="container">
				<%@include file="nav.jsp" %>
				
				<section id="container">
					<form name="updateForm" role="form" method="post" action="/board/update">
						<input type="hidden" name="bno" value="${update.bno}" readonly="readonly"/>
						<div class="form-group">
							<label class="control-label" for="title">제목</label>
							<input class="chk form-control" type="text" id="title" name="title" value="${update.title}" title="제목을 입력하세요."/>
						</div>
						<div class="form-group">
							<label class="control-label" for="content">내용</label>
							<textarea id="content" name="content" class="chk form-control" title="내용을 입력하세요."><c:out value="${update.content}" /></textarea>
						</div>
						<div class="form-group">
							<label class="control-label" for="userId">작성자</label>
							<input class="form-control" type="text" id="userId" name="userId" value="${update.userId}" readonly="readonly"/>
						</div>
						<div class="form-group">
							<label class="control-label" for="regdate">작성날짜</label>
							<fmt:formatDate value="${update.regdate}" pattern="yyyy-MM-dd"/>
						</div>
						<div class="form-group">
							<button type="submit" class="update_btn btn btn-success">저장</button>
							<button type="submit" class="cancel_btn btn btn-danger">취소</button>
						</div>
					</form>
				</section>
				<hr />
			</div>
		</main>
		
		<%@ include file="../footer.jsp" %>
	</body>
</html>