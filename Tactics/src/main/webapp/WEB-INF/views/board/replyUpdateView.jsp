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
				location.href = "/board/readView?bno=${replyUpdate.bno}"
					   + "&page=${scri.page}"
					   + "&perPageNum=${scri.perPageNum}"
					   + "&searchType=${scri.searchType}"
					   + "&keyword=${scri.keyword}";
			})
			
		})
		
	</script>
	<body>
	
		<%@include file="../header.jsp" %>
		
		<main>
		
			<div id="root" class="container">
				<%@include file="nav.jsp" %>
			
				<section id="container">
					<form name="updateForm" role="form" method="post" action="/board/replyUpdate">
						<input type="hidden" name="bno" value="${replyUpdate.bno}" readonly="readonly"/>
						<input type="hidden" id="rno" name="rno" value="${replyUpdate.rno}" />
						<input type="hidden" id="page" name="page" value="${scri.page}"> 
						<input type="hidden" id="perPageNum" name="perPageNum" value="${scri.perPageNum}"> 
						<input type="hidden" id="searchType" name="searchType" value="${scri.searchType}"> 
						<input type="hidden" id="keyword" name="keyword" value="${scri.keyword}"> 
						
						<div class="form-group">
							<label for="content" class="control-label">댓글 내용</label>
							<input type="text" id="content" name="content" class="form-control" value="${replyUpdate.content}" />
						</div>

						<div class="form-group">
							<button type="submit" class="update_btn btn btn-success">저장</button>
							<button type="button" class="cancel_btn btn btn-danger">취소</button>
						</div>
					</form>
				</section>
				<hr />
			</div>
		
		</main>
		
		<%@ include file="../footer.jsp" %>
	</body>
</html>