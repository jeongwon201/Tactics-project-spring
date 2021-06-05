<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
<head>
<title>전술 게시판</title>
<%@ include file="/resources/include/head.jsp"%>
<link href="/resources/css/readView.css?after" rel="stylesheet"
	type="text/css">
</head>

<body>
	<%@include file="../header.jsp"%>

	<main>
		<section id="container" class="container">
		<div class="row">
			<%@include file="nav.jsp"%>
			<!-- nav -->
				<div class="col-md-12">
					<form name="readForm" role="form" method="post">
						<input type="hidden" id="bno" name="bno" value="${read.bno}" /> <input type="hidden" id="page" name="page" value="${scri.page}">
						<input type="hidden" id="perPageNum" name="perPageNum" value="${scri.perPageNum}">
						<input type="hidden" id="searchType" name="searchType" value="${scri.searchType}">
						<input type="hidden" id="keyword" name="keyword" value="${scri.keyword}">
					</form>
				</div>
				
				<div class="col-md-12">
					<div class="form-group">
						<label for="title" class="col-sm-2 control-label">제목</label>
						<input type="text" id="title" name="title" class="form-control" value="${read.title}" readonly="readonly" />
					</div>
				</div>
				<input type="hidden" id="tno" name="tno" value="${read.tno}" readonly="readonly">
				<div>
					<div class="player-container">
					</div>
				</div>

				<div class="play-container col-md-12 text-center">
					<br />
					<button id="btn-play" class="btn btn-default">
						<span class="glyphicon glyphicon-play"></span>
					</button>
				</div>
				
				<div class="col-md-12">
					<div class="form-group">
						<label for="content" class="col-sm-2 control-label">내용</label>
						<textarea id="content" name="content" class="form-control" readonly="readonly"><c:out value="${read.content}" /></textarea>
					</div>
					<div class="form-group">
						<label for="userId" class="col-sm-2 control-label">작성자</label> <input type="text" id="userId" name="userId" class="form-control" value="${read.userId}" readonly="readonly" />
					</div>
					<div class="form-group">
						<label for="regdate" class="col-sm-2 control-label">작성날짜</label>
						<fmt:formatDate value="${read.regdate}" pattern="yyyy-MM-dd" />
					</div>
				</div>
				
				<div class="col-md-12">
					<c:choose>
						<c:when test="${member.userId == read.userId}">
							<button type="button" class="update_btn btn btn-warning">수정</button>
							<button type="button" class="delete_btn btn btn-danger">삭제</button>
							<button type="button" class="list_btn btn btn-primary">목록</button>
						</c:when>
						<c:otherwise>
							<button type="button" class="update_btn btn btn-warning"
								disabled="disabled">수정</button>
							<button type="button" class="delete_btn btn btn-danger"
								disabled="disabled">삭제</button>
							<button type="button" class="list_btn btn btn-primary">목록</button>
						</c:otherwise>
					</c:choose>
					<hr/>
				</div>
				
				<!-- 댓글 -->
				<div id="reply" class="col-md-12">
					<ol class="replyList">
						<c:forEach items="${replyList}" var="replyList">
							<li>
								<p>
									작성자 : ${replyList.userId}<br /> 작성 날짜 :
									<fmt:formatDate value="${replyList.regdate}"
										pattern="yyyy-MM-dd" />
								</p>

								<p>${replyList.content}</p>
								<div>
									<button type="button" class="replyUpdateBtn btn btn-warning"
										data-rno="${replyList.rno}">수정</button>
									<button type="button" class="replyDeleteBtn btn btn-danger"
										data-rno="${replyList.rno}">삭제</button>
								</div>
							</li>
							<hr />
						</c:forEach>
					</ol>
				</div>
				
				<div class="col-md-12">
					<form name="replyForm" method="post" class="form-horizontal">
						<input type="hidden" id="bno" name="bno" value="${read.bno}" /> 
						<input type="hidden" id="page" name="page" value="${scri.page}">
						<input type="hidden" id="perPageNum" name="perPageNum" value="${scri.perPageNum}">
						<input type="hidden" id="searchType" name="searchType" value="${scri.searchType}">
						<input type="hidden" id="keyword" name="keyword" value="${scri.keyword}">
						
						<div class="form-group">
							<label for="userId" class="col-sm-2 control-label">댓글 작성자</label>
							<div class="col-sm-10">
								<input type="text" id="userId" name="userId" class="form-control" />
							</div>
						</div>
	
						<div class="form-group">
							<label for="content" class="col-sm-2 control-label">댓글 내용</label>
							<div class="col-sm-10">
								<input type="text" id="content" name="content"
									class="form-control" />
							</div>
						</div>
	
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="button" class="replyWriteBtn btn btn-success">작성</button>
							</div>
						</div>
					</form>
				</div>
				
			</div>
		</section>
		<hr />
	</main>
	<%@ include file="../footer.jsp"%>
	<script type="text/javascript" src="/resources/js/readView.js"></script>
</body>
</html>