package com.spring.service;

import java.util.List;

import com.spring.vo.TacticsVO;

public interface TacticsService {
	// 내 전술 목록
	public List<TacticsVO> tacticsList(String user_id) throws Exception;

	// 전술 저장
	public void tacticsInsert(TacticsVO tacticsVO) throws Exception;
}
