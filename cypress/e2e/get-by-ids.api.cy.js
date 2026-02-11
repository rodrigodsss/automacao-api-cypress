/// <reference types="cypress" />

describe('Buscar dispositivos por IDs', () => {

  it('Buscar dispositivos específicos com sucesso', () => {
    const ids = ['3', '5', '10']

    cy.request({
      method: 'GET',
      url: 'https://api.restful-api.dev/objects?id=3&id=5&id=10'
    }).then((response) => {
      console.log('GET by IDs Response:', response.body)
      cy.log(`Status: ${response.status}`)
      cy.log(`Dispositivos encontrados: ${response.body.length}`)
      cy.log(`IDs solicitados: 3, 5, 10`)
      
      // valida status code
      expect(response.status).to.eq(200)

      // valida estrutura do body
      expect(response.body).to.exist.and.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)

      // valida que cada objeto retornado tem as propriedades esperadas
      response.body.forEach((objeto) => {
        expect(objeto).to.have.property('id').and.be.oneOf(ids)
        expect(objeto).to.have.property('name').and.be.a('string')
        expect(objeto).to.have.property('data')
        
        // data pode ser null ou object
        if (objeto.data !== null) {
          expect(objeto.data).to.be.an('object')
        }
      })
    })
  })

})
