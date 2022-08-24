import { GithubHandle } from "./GithubHandle.js";

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.loadUsers()
    }

    loadUsers() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async addUser(newUser) {
      try {
        const userExists = this.entries.find(entry => 
            entry.login.toLowerCase() === newUser.toLowerCase()
            )

        if(userExists) {
            throw new Error('Usuário já cadastrado')
        }

        const user = await GithubHandle.search(newUser)
        
        if( user.login === undefined ) {
            throw new Error('Usuário não existe')
        }

        this.entries = [ user, ...this.entries]
        this.update()
        this.save()

      } catch(error) {
        alert(error.message)
      }
    }

    deleteUser(user) {
        const filteredEntries = this.entries.
            filter(entry => entry.login !== user.login)

        this.entries = filteredEntries

        this.update()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAddUser()
    }

    onAddUser() {
        const addButton = this.root.querySelector('#add-button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.input-wrapper input')

            this.addUser(value)
        }

    }

    update() {
        this.removeAllTr()
        
        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = user.avatar_url
            row.querySelector('.user img').alt = `Foto de pergil de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.user a').href = `https://github.com/${user.login}`

            row.querySelector('.repositories').textContent = user.public_repos

            row.querySelector('.followers').textContent = user.followers

            row.querySelector('.remove-button').onclick = () => {
                const areYouSure = confirm('Are you sure you want to remove?')
                if (areYouSure) {
                    this.deleteUser(user)
                }
            }

            this.tbody.append(row)
        })
    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/ViniciusdePSouza.png" alt="Foto de perfil do Vinicius Souza">
            <a href="">
                <p>Vinícius Souza</p>
                <span>/ViniciusdePSouza</span>
            </a>
        </td>
        <td class="repositories">46</td>
        <td class="followers">456</td>
        <td class="remove-button">
            <button>Remover</button>
        </td>
        `
        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        })
    }
}

