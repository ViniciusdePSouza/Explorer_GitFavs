export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')

        this.loadUsers()
    }

    loadUsers() {
        this.entries = [
            {
                login: 'ViniciusdePSouza',
                name: 'Vinícius Souza',
                public_repos: '76',
                followers: '1000',
            }, 
            {
                login: 'diego3g',
                name: 'Diego Fernandez',
                public_repos: '566',
                followers: '95000',
            }
        ]
    }

    deleteUser(user) {
        const filteredEntries = this.entries.filter(entry => {
            entry.login !== user.login
        })

        this.entries = filteredEntries
        this.update()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.update()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Foto de pergil de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            
            row.querySelector('.repositories').textContent= user.public_repos

            row.querySelector('.followers').textContent= user.followers

            row.querySelector('.remove-button').onclick = () => {
                const areYouSure = confirm('Are you sure you want to remove?')
                if(areYouSure) {
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

