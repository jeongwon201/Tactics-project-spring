package com.spring.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.spring.vo.TacticsVO;

@Repository
public class TacticsDAOImpl implements TacticsDAO {
	@Inject
	SqlSession sql;
	
	@Override // 내 전술 목록
	public List<TacticsVO> tacticsList(String userId) throws Exception {
		return sql.selectList("tacticsMapper.tacticsList", userId);
	}
	
	@Override // 전술 불러오기
	public TacticsVO tacticsLoad(TacticsVO tacticsVO) throws Exception {
		return sql.selectOne("tacticsMapper.tacticsLoad", tacticsVO);
	}
	
	@Override // 전술 삭제
	public void tacticsDelete(TacticsVO tacticsVO) throws Exception {
		sql.delete("tacticsMapper.tacticsDelete", tacticsVO);
	}
	
	@Override // 전술 저장
	public void tacticsInsert(TacticsVO tacticsVO) throws Exception {
		sql.insert("tacticsMapper.tacticsInsert", tacticsVO);
	}
	
	@Override // 전술 중복 확인
	public int tacticsChk(TacticsVO chkTacticsVO) throws Exception {
		return sql.selectOne("tacticsMapper.tacticsChk", chkTacticsVO);
	}
}
