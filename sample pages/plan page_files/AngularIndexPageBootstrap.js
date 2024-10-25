window.EPS = window.EPS || {};
window.AppVersion=null;
window.EPS.ModuleVDName = {
    None: "None",
    AcademicSuccess: "AcademicSuccess",
    AdvisingSoftware: "AdvisingSoftware",
    GradPlanner: "GraduationPlanner",
    GradPlannerOld: "GraduationPlannerOld",
    GraduationRules: "GraduationRules",
    StudentPerformance: "StudentPerformance",
    ExperientialLearning: "ExperientialLearning",
    EducationalStrategy: "EducationalStrategy",
    Homepage: "HomePage",
    Enterprise: "Enterprise",
    PredictiveAnalytics: "PredictiveAnalytics",
    CareerInternships: 'CareerInternships',
    CollegePreparation: "CollegePreparation",
    Survey: "Survey",
    StudentPerformanceReports: "StudentPerformanceReports",
    MasterAgreement: "MasterAgreement",
    EmploymentPortal: "employmentportal",
    RetentionDashBoard: "RetentionDashBoard",
    MarkAttendance: "MarkAttendance",
    SystemConfiguration: "SystemConfiguration",
    Dashboard: "Dashboard",
    IPLAN: "IPLAN",
    ParentalAccess: "ParentalAccess",
    CurriculumCreator: "CurriculumCreator",
    CXSProfiling: "CXSProfiling",
    AboutMe: "AboutMe",
    Membership: "Membership",
    SurveyBuilder: "SurveyBuilder",
    FIN: "FIN",
    Audit: "Audit",
    Workflow: "Workflow",
    Badge: "Badge",
    SectionPlanner: "SectionPlanner",
    EarlyAlert: "EarlyAlert"
};

window.CognoWise = {};

function InitApp(ModuleName) {
    var cssSequence = ["style", "main"];
    var jsfileNames = [];
    var cssfileNames = [];
    var jsSequence = ["common", "runtime", "polyfills", "style", "script", "vendor", "main"];
    var AngularModuleName = ModuleName;
    var CDNPath = null;
    var currentDateTime = (new Date()).getTime().toString();
    url = location.href;
    var currentAppVersion;
    var globalIndexFilePath = "GlobalIndex/index.html";
    var needToExecuteThis = false;

    $.when(
        getversion()
    ).then(function (response) {
        currentAppVersion = response;
        if (window.AppVersion != null && window.AppVersion != undefined && window.AppVersion.Version) {
            globalIndexFilePath = "GlobalIndex/index.html?v=" + window.AppVersion.Version;
        }
        else {
            globalIndexFilePath = "GlobalIndex/index.html?v=" + currentDateTime;
        }
        if (window.AppVersion != null && window.AppVersion != undefined && window.AppVersion.CDNPath) {
            CDNPath = window.AppVersion.CDNPath;
        }

        GetFileExists(globalIndexFilePath);
    });

    function loadIndex(htmlString) {
        if (htmlString != null && htmlString != undefined) {
            $.when(
                GetFileNames(htmlString)
            ).then(function () {
                $.when(
                    GetCDNPath()
                ).then(function () {
                    console.log("js files count: " + jsfileNames.length);
                    if (jsfileNames.length > 0) {
                        SetJsScriptsAndStyles();
                    }
                    else {
                        $.when(
                            GetFileNames(htmlString)
                        ).then(function () {
                            SetJsScriptsAndStyles();
                        })
                    }
                });
            });
        }
        else {
            return false;
        }
    }

    // Helps to inject index files with script tags of Angular Bundles
    function SetJsScriptsAndStyles() {
        console.log("css file count: " + cssfileNames.length);
        cssSequence.forEach(element => {
            for (let j = 0; j < cssfileNames.length; j++) {
                const clsObj = cssfileNames[j];
                if (clsObj.RelationName === element) {
                    var url = CDNPath;
                    if (AngularModuleName !== "") {
                        var url = CDNPath + "/" + AngularModuleName;
                    }
                    $('head').append('<link rel="stylesheet"  type="text/css" href="' + url + "/" + clsObj.filename + '" data-preload="true" />');
                }
            }
        });
        console.log("js files count: " + jsfileNames.length);
        jsSequence.forEach(element => {
            for (let j = 0; j < jsfileNames.length; j++) {
                const clsObj = jsfileNames[j];
                if (clsObj.RelationName === element) {
                    var url = CDNPath;
                    if (AngularModuleName !== "") {
                        var url = CDNPath + "/" + AngularModuleName;
                    }
                    $('body').append('<script src="' + url + "/" + clsObj.filename + '" type="text/javascript"><\/script>');
                }
            }
        });
    }

    //Helps to fetch versioned files name from the Index File which is generated at build time
    function GetFileNames(html_string) {
        $(html_string).each(function () {
            $(this).each(function () {
                if (this.src !== undefined) {
                    var url = this.src;
                    var filename = url.substring(url.lastIndexOf('/') + 1);
                    var needToBeCreated = false;

                    if (filename.includes("main")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'main', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                    if (filename.includes("runtime")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'runtime', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                    if (filename.includes("polyfills")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'polyfills', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                    if (filename.includes("script")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'script', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                    if (filename.includes("style")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'style', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                    if (filename.includes("vendor")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'vendor', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                    if (filename.includes("common")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'common', 'Type': 'js' };
                        jsfileNames.push(fileObject);
                    }
                }
                if (this.href !== undefined) {
                    var url = this.href;
                    var filename = url.substring(url.lastIndexOf('/') + 1);
                    if (filename.includes("style")) {
                        var fileObject = { 'filename': filename, 'RelationName': 'style', 'Type': 'css' };
                        cssfileNames.push(fileObject);
                    }
                }
            });
        });
    }
    // Check file exists
    function GetFileExists(filepath) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", filepath, true);
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    loadIndex(xhr.responseText);
                } else {
                    //console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }

    // Get CDN url from database
    function getversion() {
        var AppVersion = "";
        if (window.AppVersion != null && window.AppVersion != undefined && window.AppVersion.Version)
        {
            AppVersion=window.AppVersion;
        }
        else
        {
            url = location.href;
            var baseURL = url.substring(0, url.indexOf('/', 14));
            var configBaseUrl = baseURL + '/apihost/enterprise/api/SystemConfiguration/GetVersionAsync?version=' + currentDateTime;
            try {
                $.ajax({
                    url: configBaseUrl,
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    success: function (data, textStatus, xhr) {
                        AppVersion = data;
                        window.AppVersion=AppVersion;
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        if (xhr.status === 401) {
                            var location = xhr.getResponseHeader('Location');
                            if (location != undefined) {
                                location.href = location;
                            }
                        }
                    }
                });
            } catch (ex) {
                console.log(ex);
                /// TODO: This is done as work around for 401, as xmlhttp.send() throws exception always. Need to work out better solution for this.
                location.assign(baseURL);
            }
        }
        return AppVersion;
    }
    function GetCDNPath() {
        
        if (CDNPath === "" || CDNPath === undefined || CDNPath === null) {
            CDNPath = location.host;
            url = location.href;
            var baseURL = url.substring(0, url.indexOf('/', 14));
            if (window.AppVersion != null && window.AppVersion != undefined && window.AppVersion.Version) {
                var configBaseUrl = baseURL + '/apihost/enterprise/api/SystemConfiguration/GetCDNUrl?version=' + window.AppVersion.Version;
            }
            else {
                var configBaseUrl = baseURL + '/apihost/enterprise/api/SystemConfiguration/GetCDNUrl?version=' + currentDateTime;
            }
            try {
                $.ajax({
                    url: configBaseUrl,
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    success: function (data, textStatus, xhr) {
                        CDNPath = data.CDNPath;
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        if (xhr.status === 401) {
                            var location = xhr.getResponseHeader('Location');
                            if (location != undefined) {
                                location.href = location;
                            }
                        }
                    }
                });
            } catch (ex) {
                console.log(ex);
                /// TODO: This is done as work around for 401, as xmlhttp.send() throws exception always. Need to work out better solution for this.
                location.assign(baseURL);
            }
            return CDNPath;
        }
    }
}