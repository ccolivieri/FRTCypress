import 'cypress-file-upload';

require('cypress-xpath');

describe("Automation Exercises", ()=>{

    beforeEach(()=>{
        cy.visit("https://automationexercise.com/");
        cy.title().should("eq", "Automation Exercise");
        //cy.xpath("//*[contains(text(), 'Home')]").should("be.visible");
        //cy.get("a[href='/login']").click();
        //cy.xpath("//*[contains(text(), 'New User Signup!')]").should("be.visible");

        Cypress.on("uncaught:exception", (err, runnable)=>{
            return false;
        });
    })

    it("TC1: Registrar usuario", ()=>{
        registrarUsuario("Alan Lorenzo", "alan_lorenzo@hotmail.com");

        cy.get("a[href='/delete_account']").click();
        cy.get("h2[data-qa='account-deleted']").should("be.visible");
        cy.get("a[data-qa='continue-button']").click();
    })

    it('TC2: Logear usuario con email y password correctos', ()=>{
        registrarUsuario("Alan Lorenzo", "alan_lorenzo@hotmail.com");
        //cy.get("input[data-qa='login-email']").type("alan@hotmail.com");
        //cy.get("input[data-qa='login-password']").type("12345");
        //cy.get("button[data-qa='login-button']").click();
        //cy.xpath("//*[contains(text(), ' Logged in as ')]").should("be.visible");
        cy.get("a[href='/delete_account']").click();
        cy.get("h2[data-qa='account-deleted']").should("be.visible");
    })

    it('TC3: Logear usuario con email y password incorrectos', ()=>{
        registrarUsuario("Alan Lorenzo", "alan_lorenzo@hotmail.com");
        cy.xpath("//*[contains(text(), ' Logout')]").click();
        cy.get("a[href='/login']").click();
        cy.xpath("//*[contains(text(), 'Login to your account')]").should("be.visible");
        cy.get("input[data-qa='login-email']").type("alann@hotmail.com");
        cy.get("input[data-qa='login-password']").type("12345");
        cy.get("button[data-qa='login-button']").click();
        cy.xpath("//*[contains(text(), 'Your email or password is incorrect!')]").should("be.visible");
    })

    it('TC4: Deslogear usuario', ()=>{
        registrarUsuario("Alan Lorenzo", "alan_lorenzo@hotmail.com");
        cy.xpath("//*[contains(text(), ' Logout')]").click();
        cy.xpath("//*[contains(text(), 'Login to your account')]").should("be.visible");
    })

    it('TC5: Registrar usuario con un email ya registrado', ()=>{
        registrarUsuario("Alan Lorenzo", "alanl@hotmail.com");
        cy.xpath("//*[contains(text(), ' Logout')]").click();
        cy.xpath("//*[contains(text(), 'Login to your account')]").should("be.visible");
        cy.get("a[href='/login']").click();
        cy.get("input[data-qa='signup-name']").type("Alan Lienzo");
        cy.get("input[data-qa='signup-email']").type("alanl@hotmail.com");
        cy.get("button[data-qa='signup-button']").click();
        cy.xpath("//*[contains(text(), 'Email Address already exist!')]").should("be.visible");
    })

    it('TC6: Formumario Contact Us', ()=>{
        const archivo = 'solicitudes.txt';

        cy.get("i[class='fa fa-envelope']").click();
        cy.xpath("//*[contains(text(), 'Get In Touch')]").should("be.visible");
        cy.get("Input[data-qa='name']").type("Viviana Lupa");
        cy.get("Input[data-qa='email']").type("vivi_lupa@gmail.com");
        cy.get("Input[data-qa='subject']").type("I have a question about a product");
        cy.get("textarea[data-qa='message']").type("Why the product is too expensive?");
        cy.get("input[name='upload_file']").attachFile(archivo);
        cy.get("input[name='submit']").click();
        cy.get("div[class='status alert alert-success']").should("be.visible");
        cy.get("i[class='fa fa-angle-double-left']").click();
        cy.xpath("//*[contains(text(), 'Home')]").should("be.visible");
    })

    it('TC7: Verificar la página de Test Cases', ()=>{
        cy.xpath("//a[contains(text(), 'Test Cases')]").click();
        cy.xpath("//h2[contains(@class, 'title text-center')]").should("be.visible");
    })

    it('TC8: Verificar la pagina Todos los Productos y detalle de producto', ()=>{
        cy.xpath("//a[contains(text(), ' Products')]").click();
        cy.xpath("//h2[contains(@class, 'title text-center')]").should("be.visible");
        cy.xpath("//div[contains(@class, 'features_items')]").should("be.visible");
        cy.get("a[href='/product_details/1']").click();
        cy.xpath("//h2[contains(text(), 'Blue Top')]").should("be.visible");
        cy.xpath("//p[contains(text(), 'Category')]").should("be.visible");
        cy.xpath("//span[contains(text(), 'Rs.')]").should("be.visible");
        cy.xpath("//b[contains(text(), 'Availability:')]").should("be.visible");
        cy.xpath("//b[contains(text(), 'Condition:')]").should("be.visible");
        cy.xpath("//b[contains(text(), 'Brand:')]").should("be.visible");
    })

    it('TC9: Buscar un producto', ()=>{
        cy.xpath("//a[contains(text(), ' Products')]").click();
        cy.get("h2[class='title text-center']").should("be.visible");
        cy.get("#search_product").type("Women");
        cy.get("i[class='fa fa-search']").click();
        cy.xpath("//*[contains(text(), 'Searched Products')]").should("be.visible");
        cy.get("div[class='features_items']").should("have.length", 1);
    })

    it.only('TC10: Verificar suscripción en la página Home', ()=>{
        cy.xpath("//*[contains(text(), 'Home')]").should("be.visible");
        //cy.xpath("//h2[contains(text(),'Features Items')]").type('{pagedown}');
    })

    function registrarUsuario(usuario, email){
       
        cy.get("input[data-qa='signup-name']").type(usuario);
        cy.get("input[data-qa='signup-email']").type(email);
        cy.get("button[data-qa='signup-button']").click();
        cy.xpath("//*[contains(text(), 'Enter Account Information')]").should("be.visible");
        cy.get("#id_gender1").click();
        //cy.get("#name").type(usuario);
        cy.get("#password").type("12345");
        cy.get("#days").select(9).should("be.visible");
        cy.get("#months").select("May").should("be.visible");
        cy.get("#years").select("1993").should("be.visible");
        cy.get("#newsletter").click();
        cy.get("#optin").click();
        cy.get("#first_name").type("Ivan");
        cy.get("#last_name").type("Moreno");
        cy.get("#company").type("ABC SA");
        cy.get("#address1").type("Colon 276");
        cy.get("#address2").type("Maipu 918");
        cy.get("#country").select("Canada");
        cy.get("#state").type("British Columbia");
        cy.get("#city").type("Vacouver");
        cy.get("#zipcode").type("V7P");
        cy.get("#mobile_number").type("88177261");
        cy.get("button[data-qa='create-account']").click();
        cy.xpath("//*[contains(text(), 'Account Created!')]").should("be.visible");
        cy.get("a[data-qa='continue-button']").click();
        cy.xpath("//*[contains(text(), ' Logged in as ')]").should("be.visible");
    }
})