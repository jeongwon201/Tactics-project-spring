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

	@Override // 전술 저장
	public void tacticsInsert(TacticsVO tacticsVO) throws Exception {
		dao.tacticsInsert(tacticsVO);
	}
}
