describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'user0',
      username: 'user0',
      password: 'password0'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blog List')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('userx')
    cy.get('#password').type('passwordx')
    cy.get('#loginButton').click()
    cy.get('.error').contains('Wrong credentials')
    cy.get('html').should('not.contain', 'userx logged-in')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('#username').type('user0')
    cy.get('#password').type('password0')
    cy.get('#loginButton').click()
    cy.contains('user0 logged-in')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user0', password: 'password0' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#authorInput').type('authorTest')
      cy.get('#titleInput').type('titleTest')
      cy.get('#urlInput').type('urlTest')
      cy.contains('save').click()
      cy.contains('titleTest')
    })

    describe('and a blog exists', function () {
      it('a created blog can be liked', function() {
        cy.createBlog({ author: 'author0', title: 'title0', url: 'url0' })
        cy.contains('title0')
        cy.get('.viewButton').click()
        cy.get('.likeButton').click()
        cy.contains('likes: 1')
      })
    })
  })
})