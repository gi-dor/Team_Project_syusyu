package com.teamProject.syusyu.service.cs;

import com.teamProject.syusyu.domain.cs.InqryDTO;
import com.teamProject.syusyu.domain.cs.SearchCondition;

import java.util.List;
import java.util.Map;

public interface InqryService {

    int getCount() throws Exception;

    int remove(Integer inqry_no, String regrId) throws Exception;

    int write(InqryDTO inqryDTO) throws Exception;

    List<InqryDTO> getList() throws Exception;

    InqryDTO read(Integer inqry_no) throws Exception;

    List<InqryDTO> getPage(Map map) throws Exception;

    int modify(InqryDTO inqryDTO) throws Exception;

    int getSearchResultCnt(SearchCondition sc) throws Exception;

    List<InqryDTO> getSearchResultPage(SearchCondition sc) throws Exception;

}
