package com.spring.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.spring.dao.TacticsDAO;
import com.spring.vo.TacticsVO;

@Service
public class TacticsServiceImpl implements TacticsService {
	@Inject
	TacticsDAO dao;

	@Override // 내 전술 목록
	public List<TacticsVO> tacticsList(String user_id) throws Exception {
		return dao.tacticsList(user_id);
	}

	@Override // 전술 불러오기
	public TacticsVO tacticsLoad(TacticsVO tacticsVO) throws Exception {
		return dao.tacticsLoad(tacticsVO);
	}
	
	@Override // 전술 삭제
	public void tacticsDelete(TacticsVO tacticsVO) throws Exception {
		dao.tacticsDelete(tacticsVO);
	}
	
	@Override // 전술 저장
	public void tacticsInsert(TacticsVO tacticsVO) throws Exception {
		dao.tacticsInsert(tacticsVO);
	}
	
	@Override // 전술 중복 확인
	public int tacticsChk(TacticsVO chkTacticsVO) throws Exception {
		return dao.tacticsChk(chkTacticsVO);
	}
}