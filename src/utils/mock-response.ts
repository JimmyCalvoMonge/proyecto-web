import { AboutMe } from "../model/aboutme";
import { Project } from "../model/project";

export const mockLogin = (userName: string, password: string) => new Promise<TokenResponse>(function (resolve, rejected) {
    setTimeout(() => {
        // CAMBIAMOS EL USERNAME Y PASSWORD POR DEFECTO PARA EL LOGIN //
        if (userName === "jimmy.calvo.monge@threepoints.com" && password === "proyecto-web") {
            resolve(JSON.parse(
                `{
                 "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyOTM0ODIwOTM0ODkwODA5OCIsImVtYWlsIjoibHVjYXNmZXJuYW5kZXphcmFnb25AZ21haWwuY29tIiwiaWF0IjoxNjM2OTIzOTE4LCJleHAiOjE2MzY5Mjc1MTh9.3qHpT-ZKj04-QzkissGbuyCHFkgN_WXy8LkuXcrUUSw"
                 }`
            ));
        } else {
            console.log("INVALID CREDENTIALS")
            rejected(new Unauthorized());
        }
    }, 2000);
    
})

export interface TokenResponse {
    token: string;
}
export interface ApiError {
    description?: string;
}
export class Unauthorized implements ApiError { }

export const mockAboutme = () => new Promise<AboutMe>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `{
            "id":"12389asdfasf8",
            "name":"Jimmy Calvo Monge",
            "birthday":785289600000,
            "nationality":"Costa Rica",
            "job":"Intel",
            "github":"https://github.com/JimmyCalvoMonge"
            }`
        ));
    }, 500);

});

export const mockProjects = (title: string, description: string, tags: string, link: string) => new Promise<Project[]>(function (resolve, rejected) {
    setTimeout(() => {

        let base_projects= localStorage.getItem('stored_projects') || `[
            {
            "id":"12349as8df90",
            "title":"Feature-Selection-Algorithms",
            "description":"Un pequeño proyecto de investigación sobre algunos algoritmos de rankeo de variables, como Relief, Mutual Information y Distance Discriminants.",
            "version":"17.0.1",
            "link":"https://github.com/JimmyCalvoMonge/Feature-Selection-Algorithms",
            "tag":"Python, Jupyter Notebook",
            "timestamp":"765817712000"
            },
            {
            "id":"789asdfas89",
            "title":"Fractals",
            "description":"Clases en node para graficar curvas fractales, como la función de Cantor, o el copo de nieve de Koch.",
            "version":"4.0.3",
            "link":"https://github.com/JimmyCalvoMonge/Fractals",
            "tag":"Javascript, p5.js",
            "timestamp":"765817712001"
            },
            {
            "id":"56765asdfasdf8",
            "title":"Group Theory in Python",
            "description":"Algunas funciones para un curso elemental de álgebra abstracta, factorización de polinomios en varias variables con python.",
            "version":"5.2.1",
            "link":"https://styled-components.com/docs",
            "tag":"python, SageMath",
            "timestamp":"765817712002"
            }]`

        if (title!=="" && description !=="" && tags !=="" && link!==""){
            
            base_projects=base_projects.replace("]", "");
            console.log(base_projects);
            let new_projects=base_projects+`,
                {
                "id":"12s349as8df90",
                "title":"${title}",
                "description":"${description}",
                "version":"17.0.1",
                "link":"${link}",
                "tag":"${tags}",
                "timestamp":"765817712000"
                }
            ]`;
            localStorage.setItem("stored_projects",new_projects)
            console.log(new_projects);
            resolve(JSON.parse(new_projects)); 
        } else{
            resolve(JSON.parse(
                base_projects
            )); 

        }
        
    }, 500);

});