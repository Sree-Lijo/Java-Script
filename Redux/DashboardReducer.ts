const DashboardState = {
    chartdata: [],
    EmployeeList: [],
    Project_EmployeeList: [],
    Project_List: [],
    Project_Module_List: [],
    Project_SubTask_List: [],
    AllProjectTasksList: [],
    AllTeamList: [],
    AllDesignationList: [],
    RoleName: "",
    LoginEmp: 0,


};

export const DashboardReducer = (state = DashboardState, { type, payload }) => {

    switch (type) {
        case "PROJECT_GRAPH":
            return {
                ...state,
                chartdata: payload,
            };
            break;
        case "EMPLOYEE_LIST":
            return {
                ...state,
                EmployeeList: payload,
            };
            break;
        case "PROJECT_EMPLOYEE_LIST":
            return {
                ...state,
                Project_EmployeeList: payload,
            };
            break;
        case "Project_List":
            return {
                ...state,
                Project_List: payload
            }
            break;
        case "Project_Module_List":
            return {
                ...state,
                Project_Module_List: payload
            }
            break;
        case "Project_SubTask_List":
            return {
                ...state,
                Project_SubTask_List: payload
            }
            break;
        case "All_Project_Tasks":
            return {
                ...state,
                AllProjectTasksList: payload
            }
            break;
        case "Team_List":
            return {
                ...state,
                AllTeamList: payload
            }
            break;
        case "Designation_List":
            return {
                ...state,
                AllDesignationList: payload
            }
            break;
        case "Role_Name":
            return {
                ...state,
                RoleName: payload
            }
            break;
        case "Login_Employee":
            return {
                ...state,
                LoginEmp: payload
            }
            break;
        default:
            return state;
    }
};