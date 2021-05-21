<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
	<head>
	 	<title>게시판</title>
		<%@ include file="/resources/include/head.jsp" %>
	</head>
	
	<script type="text/javascript">
		$(document).ready(function(){
			var formObj = $("form[name='updateForm']");
			
			$(".cancel_btn").on("click", function(){
				location.href = "/board/readView?bno=${replyDelete.bno}"
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
					<form name="updateForm" role="form" method="post" action="/board/replyDelete">
						<input type="hidden" name="bno" value="${replyDelete.bno}" readonly="readonly"/>
						<input type="hidden" id="rno" name="rno" value="${replyDelete.rno}" />
						<input type="hidden" id="page" name="page" value="${scri.page}"> 
						<input type="hidden" id="perPageNum" name="perPageNum" value="${scri.perPageNum}"> 
						<input type="hidden" id="searchType" name="searchType" value="${scri.searchType}"> 
						<input type="hidden" id="keyword" name="keyword" value="${scri.keyword}"> 
						
						<div>
							<p class="lead">정말 삭제 하시겠습니까?</p>
							<button type="submit" class="delete_btn btn btn-danger">삭제</button>
							<button type="button" class="cancel_btn btn btn-success">취소</button>
						</div>
					</form>
				</section>
				<hr />
			</div>
		</main>
		
	</body>
</html>