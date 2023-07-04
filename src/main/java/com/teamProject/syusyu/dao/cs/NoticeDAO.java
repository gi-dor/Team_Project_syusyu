package com.teamProject.syusyu.dao.cs;

import com.teamProject.syusyu.domain.cs.NoticeDTO;
import com.teamProject.syusyu.domain.cs.SearchCondition;

import java.util.List;
import java.util.Map;

public interface NoticeDAO {
    NoticeDTO select(Integer notcNo) throws Exception;

    NoticeDTO selectPrev(Integer notcNo)throws Exception;

    NoticeDTO selectNext(Integer notcNo)throws Exception;

    List<NoticeDTO> selectAll() throws Exception;

    int count() throws Exception;

    int insert(NoticeDTO dto) throws Exception;

    int update(NoticeDTO dto) throws Exception;

    int increaseViewCnt(Integer notcNo) throws Exception;

    int delete(Integer notcNo, String regrId) throws Exception;

    int deleteAll() throws Exception;

    List<NoticeDTO> selectPage(Map map) throws Exception;

    List<NoticeDTO> searchSelectPage(SearchCondition sc) throws Exception;

    int searchResultCnt(SearchCondition sc) throws Exception;



}