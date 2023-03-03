describe("Automation Exercises", ()=>{

    beforeEach(()=>{
        //cy.visit('https://automationexercise.com/api');

        Cypress.on("uncaugh:exception", (err, runnable)=>{
            return false;
        });
    })

    it('API 1: Obtener todos el listado de productos', ()=>{
        cy.request({
            url:'https://automationexercise.com/api/productsList'
        }).then((respuesta) =>{
            expect(respuesta.status).to.eq(200);
        });
    })
})