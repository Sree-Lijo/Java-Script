import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/items/get-all";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/profiles";

const ProjectGraph = (props: any) => {
    const sp = spfi().using(SPFx(props.context));

    return async (dispatch: any) => {
        try {
            const optionsData = [];
            const graphData = [];

            sp.web.lists.getByTitle("ProjectModuleMaster").items.filter(`ProjectID eq ${props.projectid}`).getAll().then((mitems) => {

                if (mitems.length > 0) {

                    mitems.map((data: any, index: number) => {
                        let filter = `ModuleID eq '${data.ID}'`;
                        let lblmodulename = data.ModuleCode;

                        sp.web.lists.getByTitle("ProjectSubTaskMaster").items.filter(filter).getAll().then((items) => {

                            let modulediff = (100 / items.length);
                            let subtaskdiff = (modulediff / 4);

                            let allocate = []; let approval = []; let inprogress = [];
                            let numall = 0; let numpro = 0; let numapp = 0;
                            let numcomp = 0; let cmp = [];
                            let c1; let c2; let c3; let c4;

                            {
                                items.map((res: any, index: number) => {
                                    if (res.Status === "Allocated") {
                                        allocate.push(res);
                                        numall = allocate.length;
                                        if (numall == 0) {
                                            c1 = 0;
                                        }
                                        else {
                                            c1 = numall * subtaskdiff * 1;
                                        }
                                    }
                                    else if (res.Status === "InProgress") {
                                        inprogress.push(res);
                                        numpro = inprogress.length;
                                        if (numpro == 0) {
                                            c2 = 0;
                                        }
                                        else {
                                            c2 = numpro * subtaskdiff * 2;
                                        }
                                    }
                                    else if (res.Status === "Approval") {
                                        approval.push(res);
                                        numapp = approval.length;
                                        if (numapp == 0) {
                                            c3 = 0;
                                        }
                                        else {
                                            c3 = numapp * subtaskdiff * 3;
                                        }
                                    }
                                    else if (res.Status === "Completed") {
                                        cmp.push(res);
                                        numcomp = cmp.length;
                                        if (numcomp == 0) {
                                            c4 = 0;
                                        }
                                        else {
                                            c4 = numcomp * subtaskdiff * 4;
                                        }
                                    }
                                });
                            }

                            if (c1 == undefined) {
                                c1 = 0;
                            }
                            if (c2 == undefined) {
                                c2 = 0;
                            }

                            if (c3 == undefined) {
                                c3 = 0;
                            }
                            if (c4 == undefined) {
                                c4 = 0;
                            }

                            graphData.push(c1 + c2 + c3 + c4);
                            optionsData.push(lblmodulename);

                            const chartdata = optionsData.map((element, index) => ({
                                labels: ` ${element}`,
                                data: `${graphData[index]}`
                            })
                            )

                            setTimeout(() => {
                                dispatch({ type: "PROJECT_GRAPH", payload: chartdata });
                            }, 400)

                        })
                    });
                } else {
                    setTimeout(() => {
                        dispatch({ type: "PROJECT_GRAPH", payload: [] });
                    }, 400)
                }
            })

        } catch (error) {
            console.log(error);
        }
    };
};

const FetchProjectEmployeeData = (props: any) => {
    const sp = spfi().using(SPFx(props.context));
    return async (dispatch) => {

        sp.web.lists.getByTitle("ProjectWorkForce").items.select("EmpID").getAll().then((items) => {

            //dispatch({ type: "PROJECT_EMPLOYEE_LIST", payload: items[0].EmpID.split(',') });
            const emprecords = [];
            {
                items[0].EmpID.split(',').map((data) => {
                    sp.web.lists.getByTitle("EmployeeList").items.filter(`ID eq ${data}`).getAll().then((empitems) => {

                        //dispatch({ type: "EMPLOYEE_LIST", payload: items });
                        empitems[0].DESG = 'Software Enginner';
                        emprecords.push(empitems);

                    }).catch((err) => {
                        console.log(err);
                    });
                })
            };
            dispatch({ type: "PROJECT_EMPLOYEE_LIST", payload: emprecords });
        }).catch((err) => {
            console.log(err);
        });
    };
};

const FetchAllEmployeeData = (props: any) => {
    const sp = spfi().using(SPFx(props.context));
    return async (dispatch) => {

        try {

            const allEmpList = await sp.web.lists.getByTitle("EmployeeList").items.getAll();
            dispatch({ type: "EMPLOYEE_LIST", payload: allEmpList });

            sp.profiles.userProfile.then(async function (item) {
                const pp = await sp.profiles.myProperties();

                const login = await sp.web.lists.getByTitle("EmployeeList").items.filter(`Email eq '${pp.Email}'`).getAll();

                dispatch({ type: "Login_Employee", payload: login[0].ID });

                let prop2 = {
                    context: props.context,
                    roleId: parseInt(login[0].EmployeeType)
                };

                dispatch(Actions.RoleName(prop2));

            })

        } catch (err) {
            console.log(err);
        }

    };
};

const RoleName = (props) => {

    return async (dispatch) => {
        try {
            const sp = spfi().using(SPFx(props.context));
            const roleList = await sp.web.lists.getByTitle("RoleMaster").items.filter("ID eq " + props.roleId + "").getAll();

            dispatch({ type: "Role_Name", payload: roleList[0].Title });

        } catch (error) {
            console.log(error);
        }
    }
}

const AllProjectList = (props: any) => {

    const sp = spfi().using(SPFx(props.context));
    return async (dispatch: any) => {
        try {
            const projectList = await sp.web.lists.getByTitle("ProjectMaster").items.getAll();
            dispatch({ type: "Project_List", payload: projectList })
        } catch (error) {
            console.log("Getting error in the project list ", error);
        }
    }
}

const AllProjectModuleList = (props: any) => {

    return async (dispatch: any) => {
        try {
            const sp = spfi().using(SPFx(props.context));
            sp.web.lists.getByTitle("ProjectModuleMaster").items.getAll().then((items) => {
                dispatch({ type: "Project_Module_List", payload: items })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const AllProjectTasks = (props: any) => {
    return async (dispatch) => {
        try {
            const sp = spfi().using(SPFx(props.context));
            const AllTasks = await sp.web.lists.getByTitle("ProjectTaskMaster").items.getAll();
            dispatch({ type: "All_Project_Tasks", payload: AllTasks })

        } catch (err) {
            console.log("All tasks list error", err);
        }
    }
}

const AllProjectSubTaskList = (props: any) => {

    return async (dispatch: any) => {
        try {
            const sp = spfi().using(SPFx(props.context));

            const AllSubTasks = await sp.web.lists.getByTitle("ProjectSubTaskMaster").items.getAll();

            dispatch({ type: "Project_SubTask_List", payload: AllSubTasks });

        } catch (error) {
            console.log("All subtask action list ", error);
        }
    }
}

const AllTeamList = (props) => {
    return async (dispatch) => {
        try {
            const sp = spfi().using(SPFx(props.context));

            const teamList = await sp.web.lists.getByTitle("TeamMaster").items.getAll();
            dispatch({ type: "Team_List", payload: teamList });

        } catch (err) {
            console.log(err);
        }
    }
}

const AllDesignation = (props) => {
    return async (dispatch) => {
        try {
            const sp = spfi().using(SPFx(props.context));
            const designationList = await sp.web.lists.getByTitle("DesignationMaster").items.getAll();
            dispatch({ type: "Designation_List", payload: designationList });

        } catch (err) {
            console.log("Designation list error ", err);
        }
    }
}

const Actions: any = {
    ProjectGraph,
    FetchProjectEmployeeData,
    FetchAllEmployeeData,
    AllProjectList,
    AllProjectModuleList,
    AllProjectSubTaskList,
    AllProjectTasks,
    AllTeamList,
    AllDesignation,
    RoleName
};

export default Actions;
