<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html>
	<head>
		<%@ include file="/resources/include/head.jsp" %>
		<title>회원정보수정</title>
	</head>
	<script type="text/javascript">
		$(document).ready(function(){
			// 취소
			$(".cencle").on("click", function(){
				
				location.href = "/";
						    
			})
		
			$("#submit").on("click", function(){
				if($("#userPw").val()==""){
					alert("비밀번호를 입력해주세요.");
					$("#userPw").focus();
					return false;
				}
				if($("#userName").val()==""){
					alert("성명을 입력해주세요.");
					$("#userName").focus();
					return false;
				}
				
				$.ajax({
					url : "/member/passChk",
					type : "POST",
					dateType : "json",
					data : $("#updateForm").serializeArray(),
					success: function(data){
						
						if(data==true){
							if(confirm("회원수정하시겠습니까?")){
								$("#updateForm").submit();
							}
							
						}else{
							alert("패스워드가 틀렸습니다.");
							return;
							
						}
					}
				})
			});
			
			$("#memberDeleteBtn").on("click", function() {
				location.href = "memberDeleteView";
			})
		})
	</script>
	<body>
		<%@include file="../header.jsp" %>
		<section id="container">
			<form id="updateForm" action="/member/memberUpdate" method="post">
				<div class="form-group has-feedback">
					<label class="control-label" for="userId">아이디</label>
					<input class="form-control" type="text" id="userId" name="userId" value="${member.userId}" readonly="readonly"/>
				</div>
				<div class="form-group has-feedback">
					<label class="control-label" for="userPw">패스워드</label>
					<input class="form-control" type="password" id="userPw" name="userPw" />
				</div>
				<div class="form-group has-feedback">
					<label class="control-label" for="userName">성명</label>
					<input class="form-control" type="text" id="userName" name="userName" value="${member.userName}"/>
				</div>
			</form>
				<div class="form-group has-feedback">
					<button class="btn btn-success" type="button" id="submit">수정하기</button>
					<button class="cencle btn btn-danger" type="button">취소</button>
					&nbsp;&nbsp;&nbsp;
					<button id="memberDeleteBtn" class="btn btn-warning" type="button">회원탈퇴</button>
				</div>
				
		</section>
		<%@ include file="../footer.jsp" %>
	</body>
	
</html>