import Helper from "shared/helper";
import { apiUrl as serverApi } from "config";

const GetEntityInfo = async (name) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}${name}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}



 


	    
	 	
	
		
/* Departments */

const GetDepartmentsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Departments/$count`;
        if (query) url = `${serverApi}Departments/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetDepartmentsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Departments`;
        if (query) url = `${serverApi}Departments?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetDepartmentSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Departments(${id})`;
        if (params) {
            url = `${serverApi}Departments(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetDepartmentSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.DeptID;
        let method = "POST";
        let url = `${serverApi}Departments`;
        if (input.DeptID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Departments(${input.DeptID})`;
        } else if (input.DeptID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Departments(${input.DeptID})`;
        }

        delete input['DeptID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.DeptID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */
const SetDepartmentHasJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.StaffID;
        let method = "POST";
        let url = `${serverApi}Lecturers`;
        if (input.StaffID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Lecturers(${id})`;
        } else if (input.StaffID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Lecturers(${id})`;
        }

        delete input['StaffID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.StaffID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetDepartmentHasJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Lecturers(${id})`;
        if (filter) {
            url = `${serverApi}Lecturers?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   		
	
	    
	 	
	
		
/* Colleges */

const GetCollegesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Colleges/$count`;
        if (query) url = `${serverApi}Colleges/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCollegesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Colleges`;
        if (query) url = `${serverApi}Colleges?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCollegeSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Colleges(${id})`;
        if (params) {
            url = `${serverApi}Colleges(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCollegeSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CollegeID;
        let method = "POST";
        let url = `${serverApi}Colleges`;
        if (input.CollegeID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Colleges(${input.CollegeID})`;
        } else if (input.CollegeID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Colleges(${input.CollegeID})`;
        }

        delete input['CollegeID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CollegeID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */
const SetCollegeAdmissionedJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.StudentID;
        let method = "POST";
        let url = `${serverApi}Students`;
        if (input.StudentID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Students(${id})`;
        } else if (input.StudentID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Students(${id})`;
        }

        delete input['StudentID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.StudentID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetCollegeAdmissionedJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Students(${id})`;
        if (filter) {
            url = `${serverApi}Students?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   							// For Nested APIs
			/* $navPropName */
const SetCollegeCoursesOfferedJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CourseID;
        let method = "POST";
        let url = `${serverApi}Courses`;
        if (input.CourseID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Courses(${id})`;
        } else if (input.CourseID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Courses(${id})`;
        }

        delete input['CourseID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CourseID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetCollegeCoursesOfferedJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Courses(${id})`;
        if (filter) {
            url = `${serverApi}Courses?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   							// For Nested APIs
			/* $navPropName */
const SetCollegeCollegeStaffJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.DeptID;
        let method = "POST";
        let url = `${serverApi}Departments`;
        if (input.DeptID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Departments(${id})`;
        } else if (input.DeptID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Departments(${id})`;
        }

        delete input['DeptID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.DeptID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetCollegeCollegeStaffJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Departments(${id})`;
        if (filter) {
            url = `${serverApi}Departments?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            		
	
	    
	 	
	
		
/* PreviousEducations */

const GetPreviousEducationsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}PreviousEducations/$count`;
        if (query) url = `${serverApi}PreviousEducations/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPreviousEducationsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}PreviousEducations`;
        if (query) url = `${serverApi}PreviousEducations?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPreviousEducationSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}PreviousEducations(${id})`;
        if (params) {
            url = `${serverApi}PreviousEducations(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPreviousEducationSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.EducationID;
        let method = "POST";
        let url = `${serverApi}PreviousEducations`;
        if (input.EducationID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}PreviousEducations(${input.EducationID})`;
        } else if (input.EducationID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}PreviousEducations(${input.EducationID})`;
        }

        delete input['EducationID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.EducationID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Students */

const GetStudentsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Students/$count`;
        if (query) url = `${serverApi}Students/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetStudentsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Students`;
        if (query) url = `${serverApi}Students?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetStudentSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Students(${id})`;
        if (params) {
            url = `${serverApi}Students(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetStudentSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.StudentID;
        let method = "POST";
        let url = `${serverApi}Students`;
        if (input.StudentID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Students(${input.StudentID})`;
        } else if (input.StudentID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Students(${input.StudentID})`;
        }

        delete input['StudentID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.StudentID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */
const SetStudentEducationDetailsJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.EducationID;
        let method = "POST";
        let url = `${serverApi}PreviousEducations`;
        if (input.EducationID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}PreviousEducations(${id})`;
        } else if (input.EducationID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}PreviousEducations(${id})`;
        }

        delete input['EducationID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.EducationID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetStudentEducationDetailsJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}PreviousEducations(${id})`;
        if (filter) {
            url = `${serverApi}PreviousEducations?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            		
	
	    
	 	
	
		
/* Courses */

const GetCoursesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Courses/$count`;
        if (query) url = `${serverApi}Courses/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCoursesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Courses`;
        if (query) url = `${serverApi}Courses?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCourseSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Courses(${id})`;
        if (params) {
            url = `${serverApi}Courses(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCourseSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CourseID;
        let method = "POST";
        let url = `${serverApi}Courses`;
        if (input.CourseID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Courses(${input.CourseID})`;
        } else if (input.CourseID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Courses(${input.CourseID})`;
        }

        delete input['CourseID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CourseID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */
const SetCourseContainsJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.SubjectID;
        let method = "POST";
        let url = `${serverApi}Subjects`;
        if (input.SubjectID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Subjects(${id})`;
        } else if (input.SubjectID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Subjects(${id})`;
        }

        delete input['SubjectID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.SubjectID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetCourseContainsJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Subjects(${id})`;
        if (filter) {
            url = `${serverApi}Subjects?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            		
	
	    
	 	
	
		
/* Lecturers */

const GetLecturersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Lecturers/$count`;
        if (query) url = `${serverApi}Lecturers/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetLecturersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Lecturers`;
        if (query) url = `${serverApi}Lecturers?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetLecturerSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Lecturers(${id})`;
        if (params) {
            url = `${serverApi}Lecturers(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetLecturerSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.StaffID;
        let method = "POST";
        let url = `${serverApi}Lecturers`;
        if (input.StaffID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Lecturers(${input.StaffID})`;
        } else if (input.StaffID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Lecturers(${input.StaffID})`;
        }

        delete input['StaffID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.StaffID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */
const SetLecturerTeachesJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.SubjectID;
        let method = "POST";
        let url = `${serverApi}Subjects`;
        if (input.SubjectID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Subjects(${id})`;
        } else if (input.SubjectID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Subjects(${id})`;
        }

        delete input['SubjectID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.SubjectID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetLecturerTeachesJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Subjects(${id})`;
        if (filter) {
            url = `${serverApi}Subjects?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            		
	
	    
	 	
	
		
/* Subjects */

const GetSubjectsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Subjects/$count`;
        if (query) url = `${serverApi}Subjects/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetSubjectsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Subjects`;
        if (query) url = `${serverApi}Subjects?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetSubjectSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Subjects(${id})`;
        if (params) {
            url = `${serverApi}Subjects(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetSubjectSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.SubjectID;
        let method = "POST";
        let url = `${serverApi}Subjects`;
        if (input.SubjectID && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Subjects(${input.SubjectID})`;
        } else if (input.SubjectID && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Subjects(${input.SubjectID})`;
        }

        delete input['SubjectID'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.SubjectID });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
 


// Below is a reference function - a possible business logic for ecom reference app
const GetProductStatus = async (productId) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings?$filter=ProductId eq ${productId}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                let _tmp = { Status: '' };
                if (json.value && json.value.length > 0) {
                    _tmp = json.value[0];
                }
                return resolve({ status: res.ok, values: _tmp });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}




const GetMetaData = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}$metadata`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (res.status === 200) {
                const values = await res.text();
                return resolve({ status: res.ok, values });
            }

            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

/* Prodict List View Details */
const GetProductOnBoardings = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

export {
 GetEntityInfo,  GetDepartmentsCount, GetDepartmentsMulti, GetDepartmentSingle, SetDepartmentSingle, SetDepartmentHasJoin, GetDepartmentHasJoin, GetCollegesCount, GetCollegesMulti, GetCollegeSingle, SetCollegeSingle, SetCollegeAdmissionedJoin, GetCollegeAdmissionedJoin, SetCollegeCoursesOfferedJoin, GetCollegeCoursesOfferedJoin, SetCollegeCollegeStaffJoin, GetCollegeCollegeStaffJoin, GetPreviousEducationsCount, GetPreviousEducationsMulti, GetPreviousEducationSingle, SetPreviousEducationSingle, GetStudentsCount, GetStudentsMulti, GetStudentSingle, SetStudentSingle, SetStudentEducationDetailsJoin, GetStudentEducationDetailsJoin, GetCoursesCount, GetCoursesMulti, GetCourseSingle, SetCourseSingle, SetCourseContainsJoin, GetCourseContainsJoin, GetLecturersCount, GetLecturersMulti, GetLecturerSingle, SetLecturerSingle, SetLecturerTeachesJoin, GetLecturerTeachesJoin, GetSubjectsCount, GetSubjectsMulti, GetSubjectSingle, SetSubjectSingle, GetProductStatus, GetMetaData, GetProductOnBoardings
};