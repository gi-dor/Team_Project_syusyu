<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
    <meta charset="UTF-8">
    <title><tiles:getAsString name="title"/></title>
  <tiles:insertAttribute name="css" />
  <tiles:insertAttribute name="script" />

</head>
<body>
    <tiles:insertAttribute name="body"/>
</body>
</html>
