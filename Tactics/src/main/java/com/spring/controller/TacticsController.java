package com.spring.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.service.TacticsService;
import com.spring.vo.MemberVO;
import com.spring.vo.TacticsVO;

@Controller
@RequestMapping("/tactics/*")
public class TacticsController {

	@Inject
	TacticsService service;

	private static final Logger logger = LoggerFactory.getLogger(TacticsController.class);

	// 전술 만들기 페이지 이동, 셀렉트 박스에 전술 불러오기
	@RequestMapping(value = "tactics", method = RequestMethod.GET)
	public void tactics(TacticsVO tacticsVO, Model model, HttpSession session) throws Exception {
		logger.info("tactics");

		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		String user_id = memberVO.getUserId();

		model.addAttribute("tacticsList", service.tacticsList(user_id));
	}

	// 전술 불러오기
	@RequestMapping(value = "tacticsLoad", method = RequestMethod.POST)
	@ResponseBody
	public String tacticsLoad(HttpServletRequest req, HttpSession session) throws Exception {
		logger.info("tacticsLoad");

		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		String user_id = memberVO.getUserId();
		String title = req.getParameter("title");

		TacticsVO tacticsVO = new TacticsVO();
		tacticsVO.setTitle(title);
		tacticsVO.setUser_id(user_id);

		tacticsVO = service.tacticsLoad(tacticsVO);
		String url = tacticsVO.getUrl();

		String data = "";
		try {
			File file = new File(url);
			FileReader filereader = new FileReader(file);
			BufferedReader bufReader = new BufferedReader(filereader);
			data = bufReader.readLine();
			bufReader.close();
		} catch (FileNotFoundException e) {
		} catch (IOException e) {
			System.out.println(e);
		}
		return data;
	}

	// 전술 삭제
	@RequestMapping(value = "tacticsDelete", method = RequestMethod.POST)
	@ResponseBody
	public int tacticsDelete(HttpServletRequest req, HttpSession session) throws Exception {
		logger.info("tacticsDelete");

		int result;
		try {
			MemberVO memberVO = (MemberVO) session.getAttribute("member");
			String user_id = memberVO.getUserId();
			String title = req.getParameter("title");

			TacticsVO tacticsVO = new TacticsVO();
			tacticsVO.setTitle(title);
			tacticsVO.setUser_id(user_id);

			try {
				tacticsVO = service.tacticsLoad(tacticsVO);
				String url = tacticsVO.getUrl();
				File file = new File(url);
				if (file.exists()) {
					file.delete();
					service.tacticsDelete(tacticsVO);
					result = 1;
				} else {
					result = 0;
				}
			} catch (FileNotFoundException e) {
				result = 0;
			} catch (IOException e) {
				System.out.println(e);
				result = 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = 0;
		}
		return result;
	}

	//전수 저장
	@RequestMapping(value = "tacticsSave", method = RequestMethod.POST)
	@ResponseBody
	public int tacticsSave(HttpServletRequest req, HttpSession session) throws Exception {
		logger.info("tacticsSave");

		int result;
		try {
			MemberVO memberVO = (MemberVO) session.getAttribute("member");
			String user_id = memberVO.getUserId();

			String textSaveName = req.getParameter("textSaveName");
			String scene = req.getParameter("sceneJson");

			String fileName = "C:\\Users\\jeong\\git\\Project\\Tactics\\src\\main\\webapp\\resources\\save\\" + user_id + "_" + textSaveName
					+ ".txt";

			try {
				BufferedWriter fw = new BufferedWriter(new FileWriter(fileName));
				fw.write(scene);
				fw.flush();
				fw.close();
			} catch (Exception e) {
				e.printStackTrace();
			}

			TacticsVO chkTacticsVO = new TacticsVO();
			chkTacticsVO.setTitle(textSaveName);
			chkTacticsVO.setUser_id(user_id);

			if (service.tacticsChk(chkTacticsVO) == 0) {
				TacticsVO tacticsVO = new TacticsVO();
				tacticsVO.setTitle(textSaveName);
				tacticsVO.setUrl(fileName);
				tacticsVO.setUser_id(user_id);

				service.tacticsInsert(tacticsVO);
			}

			result = 1;
		} catch (Exception e) {
			e.printStackTrace();
			result = 0;
		}

		return result;
	}
}