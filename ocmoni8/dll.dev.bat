@echo off
set build=b
set deploy=d
if "%1" == "%build%" (
	rd dist\dll /s /q
	webpack --config webpack.dll.dev.js
) else if "%1" == "%deploy%" (
	rd ..\..\public\oc\dll /s /q
	md ..\..\public\oc\dll

	xcopy dist\dll\*.* ..\..\public\oc\dll
) else (
	echo error command: b d
)