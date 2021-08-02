import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const HivesPage = () => {
    const [hives, setHives] = useState([])

    useEffect(() => {
        setHives([
            {
                name: "Hive 1",
                id: 1
            },
            {
                name: "Hive 2",
                id: 2
            }
        ])
    }, [])

    const hivesArray = hives.map(hive => {
        return (
            <li key={hive.id}>
                <Link to={`/hives/${hive.id}`}>
                    <h3>{hive.name}</h3>
                    <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABC1BMVEX///8zMzP3sjlNTU3gmy39tjkYJTP8tTkjKzMwMTOrgDbjpDgaGhpAOzP/uDkqLjPZ2dl+YTUNDQ2JaTW4iDZmUzQhISEuLi4oKCjlni0dHR309PQdKTMXFxcmLTO5ubni4uI8PDyfn5+ccTDr6+s3NzfOjy6AgIBISEjMzMywsLCoeC9RUVGLi4tpaWn3rijExMTekgB1WDFfX19wcHCnp6eTk5OHh4fR0dHqpTJiYmK+hi5FPjPLlTfZly3VnDj8479rVTRNQzP469npunn72Kb4ulPtyJiUbDBZSjT97tfmr2D5xHEAAAD248rjpkvrv4T+9+360JH4wGX73rP5zIbntGwIIDLqvYD7xgRRAAASdElEQVR4nO1deV/azBYWFEIkJgg2CZAEUFKQoqIsotW6dZG2t629b2/f7/9JbraZLJBkJpkJ2l+fv7pAMg/nzMxZZzY2/uJPQLfSXPcQqKI9VFWx107+gGaK72aBLiflcjm5Oqkk+np7OlZV9YjwoIiiJ+csyOpwhPvd+VGHE80fSDymMTRC0HMAEteZok/IZmsic7LkfFfF/nWyg8vQ4CiqaMra3h+qouT5pnxOe5zJAbQUDFXtxwny8LyjylLO/7VeNqNNgrYaGKwkVieHYZ/uDo6rjSA9A41BlmPGxFwSg+OVOH3WXv5kZX+TE5fZmV/oZD5sLAxyjaVxy9X+tOv5THPUk5d006FnaHY39OHPBK0+tzR4SeSGA3tKdgeXYkNexc78lH4UqtTPCYeT6jIFY20dD+azfnW1bppTdjxtr3voyOgeySuISOKqhcXSTU6atF6aQdvaVFfr4grhdmbzdQ83ESpH0vKqE4Asii9JN5cxuqyu1kugnb0Xp5tL6O73Q7VVGifzQZ4d2jOdC9kejAVm0F73+Ihg3pPCSIqqvB6Wzdnm5jnJOXLY8zhISyxzmbPs5kRJkmWybz08WnYkPCwNjc1wXvatgUh90s+t7PdDDG6LJSePZ6NM7NKJM2mqbfLPNgzTqhhqDEiyYQD0BrQjdvuc874GpYDCyFx5QjdKgyXHGTTn1GiOquBdNGTooLI/XOn/+mj2J9NDLKXt9vqbs9gfptuAbyE+D31ojo76qhhp9BjGutoYz1qIWjs3TChJlOI+3IGvFOlP+u7IjCJGsbTFKfYn+6N23NNy1nPkmHjkMVwFqhl5owbLTTVKY21xGmtQtTOZtebdMBkdOuuHGinEGdRRbp8CmzCYGtsI8f0DPBuc1D8+mh62l3i0nCgR145400gFD5Mn9PishiHLpUBWFNGqNJ7MBh6mKAzbHHwI3VUmBPuNMFIRTEVDpuf7g1FlKscybOpZrjKrMHZnoxSzAPmZmlSBksuDeTtksl5mvsoE0YQjkI4Hvb4cvZuEwWDLNUS5M5z0ZvuD1uiwYjA2sOFOA3ltcWfX3OAMO7xZaR2NjS0xEU9DtIZsZVE0CKsGDFvRs5TNDOz7MJsdHWHkkxLjHPzMUg68rTuf9oZSUp4hkFdC/E+LPkVocQRW8+7h9HwsGwuLTJLoEihaqgDueq6umCvNymjaG3dUS6I0mGaR+hpAio3wBb19OJhN+oZL2TBlSpCqNKTP0DUcpc24jzbbo8Gsd9kRqyoX7nViMcwiy97MAZlwyA5qsz0fwQytsXxakk0iWjWDpcb0gpzXyTOcrwGrTWyNWtNZbzLe1MVqVVUNTbYoyxZrKYq5pGZUKDET0zD0WW3NbrsyH7UGU2PDO+9NLsfDzX6no9t2UACyNMzMEBjaPzOeaYXkWwA0VyHZYBOha0XkGngqg8Vw7egODTsLS0dfGkOD47KLG4OXxhAffxm+fPxl+PLxl+HLx1+Gzx3z/UmuUY0CDKRxUZ9Sxc5k+vyqQCrhZQD4kCRR1WfPqgaye7yiFjAlZPXo+VQrzYK1x4Q4ypm48/FoDhHzNfhQkeJqD9+eqBLs6sQV1IV4Gc9v6/T09AtFgp5kERWKcT720+mWgfp3egz7XoKsAKElhiCwXooxivq+bjLcOr2lRdDTwsFqyv3ZLkAtOc52FM0lGRM93LJR/0GJ4CHMROVKOwfv6hAMnwblR0FzpRi5adBmCHWUVR7r9S2IfErw+d0iYBidqABa+o0OwRbIYLDCaw+/rYu0DA2Oe5CiGmXdUF5poAj9BFOL0E8xOuz88N3YLf5HiWAbFIYob3wECYjQpFgDc1GKHsbTA7Udf99ZSNlXPoIpRXhiwP5TzllRubU1Qzih/Zzy1sewnorfx9unhw8WxcJ2yVHTLGujfAAivPeLMI2Snny1nvzEmH+5UBwtjbfd6ABMQ6FGTkkZ59m3phT5ha2ma2sInDsFUqU3xBie/AQPN//G7wqOENfkKR4Chm/JMfwAHv7R+FvhQEMxa14WQ58MXYZrimjMOeJams87z7bnIdgRZWIyvP1+Wn+PvH12Kaw0YC21tgv+lbMh6qQIfjJtvPoWMkUKu4W5Hz58/uBs+c5+SKyE5uHU3rDfo34B7vivyTH02DSFPbDjkzqL45MjijrqF2aOEIU7klYbBLPjKCmxthJshnNoeb+lYXkfOCLMcaQWmm+2lm6Vkb8BaqNY9h157+kaek/kavW2rGFiBHUGIFLK7rwj7QFfl0CsRiWXxHgqn9brp58wvgFDiaywRzKKwRQOioAg2VK920+fsLzJEQx3s8ri7ZYnElVgkqJQ4PN7Vwp48LoMmvaoNTDQ8hx5wyq5u8cDgO3keFyUFDeaKI3tN+G1kKVDc3DZsMsJRX/GgmXdQHApOTTW91TJflODy/WyOd2o3RNDu0wpQ25k4e2fk88U4kAUKZdftjvUMmmo4MY0ncVWdU366YUktqkRnFbj358BpAatOoaBGv/2TEBLim2vBAWtpAAUs4BSEjwU6QTf3P5jVhPO3rx97eBdOQtcb98V3YwblcaZmWugsQemfUbUVYq3VBn+ouaaOir5QH8X6qi28PkR2RC0wN/oQFXju3WwcQQ2eu2MuCuIDCZ/BV0q4hYcdJMW5LIwCSheAKOVePvTCLQ4C+9ohGSQUYB50wZh0+bcUVLtkUrQKQYnJwzIKYJsDfFTT8BWofhFmM1CevLzaePp1v4zc+34xsRCjDaazlYRzPZmwvDkH2sMTw5FR02lMVGGoDN2HUrK/NcZxK0d6gdqKhJlWEmfhGEKPJ/PX1yYYud5hkH+oiNCmMyoOXtilSjDtMlQhmdutncXO4JhxJbYnUVt+8ZgicjwFozC+mvh0THeqkQX01QyZPj83p1pOrMsMPuEUlGrXed5JIYga2rLsABSbmRlmGIeMvzNrqZ4HAMAQdEfL5A4OoP4aWvpGRUthWspdg6GL9/9XkHPfppWrCFwZOycor3Q5HmQ2yfsQYH9UPMRjN0tCvlaMYyf/bzSdiF2Pp7kP3z756tNkLlxdgvSDhSoI9UOcITI73mqKEOg3JfjxXhiWDXOI0F9BumgG7BLWXYLnSFTK7Lh1KCuFveQZqP9yBsQ7lfbZBmCiZgTzlBThUx+UQpj5UexhkyRAe4T+cMjYLmz8ojmHzJlfWkG6h0LevDflbsCGsHCHdB68pFhNw6l1Lx5tDAHkbnQ/Rra6fc3HZhnCvhZlpAoFvKvoFbIpAl6a9a1+7cejiF6GiAI2bksO36KcYrKFJg9AWoFlcP93V+dVRaPbrIwX1gB5t6rop0gPxtejkqNX/UciPzNwY4biCLsWJhojmabnog+qymKJkTAmyEL4Weg79HVyMcZ9qy3QyEnXU7JBttGx424UwXD0R+GMvSLEQeSzMk9YiRb+vJdAxgEI/gZ07Gf/MmyOiTCsTtMwy+GoKmpKR4uoTW3RWOULuEbSzAdxZzcaackmDKhhkBwc9hJ84a0qbZBOoLhq6gPSzYOFkUxDcVDH0GWjVzQAdxFXUcj6NVTpDf4+/ekFLHhpqcoQSiV7u/OHOxG4Q6+HkVHLXTgWyKf7L7iSvFW3CTP0rgH+rLKnafi6SKytQ4UZ+f0qI3QD/Ae5Rqxfy+/d+9yFJPWoBzCrLZw5bVEo7MxPKgKRRehK0RhF9WPYgp7rpETfTBxOKCZpt3V0TOGZeCios5CE3Amauhx1MLFFbB9E16UButjhVcY9bEMaFZCXUhtgOVUuUGnyOShuiRryADuEqtjBC7cOAqOkrpqWtpGZ2g42UBfxERnE0CnHqvEmYdZWvR1xqOm6BPRehkolE7U+wXC3IGkb2yIFGQwsZQUrqbsAoHhyclHkE4E63YSl3/qxJ4wA/nlZAyHzkRkd2L5MR8/b8BEFEjTcAkMG5D1DeREYxL3brQPaxp6JmK8CO3xfTYpMntK8ol4DOrwsXKiMEWblGExjh9MRVlpDLDWiFN8hs7Z5JgtP/BHTcywHMcQFKJbenoBer8wj3A0MXyuDMEALTXNp2B46TDUM9bSuGTPyWdngFb7VzlFMzTY8ItbWAzTrjRKDEGQa7MzwvAHTRICB832pb0sdgtgtrG5OIb5k1/m8J4+msYP7DJtJLhnAGSbAqmY2B3/dzKGzrfY+/jw/kn+54dfdqkDdGQiThYPRRPUeeF1F/LgIAQM79DDUDhDsdpANrEA1rVkt32AqywErDMh+DtgeWMRBHapdoCYhbIBkiPJ+jDAGYC50iOG6Q1nRjLfQrnG8C14mGtDuU7g9su77//4/wnGMJQD9JJSd7vA8YDdMAY6P8NRA69CKcX8cWqYnIFjXqaw7lnZ3aqjCjHPJohiQOfpFbLzxJfdFHM13u522kcDzZVu7bqmew+Byke13rkuMMZqClz80h6P1sHHlx81mL9DuTbpX0dE/pPdKm64lNW0RQ2t9a4G34wsRDdMg9jV97hQPEUeKAcSfHEUMHDcku/yI9TWOzc1ijwT3ZcgdvX5GviQjr7/YcuwHjxvaZKukQtNiOkSFzkVyXF6cubh0plgKSni6WgiVBG3wtvT+uom516qZicUPU1FUKoiu75Pn95/elj1H61Ul6fEU0xFUOyQaGNr9hDvKE9EMQ1BmUvg965Eu8clL1TQo5ab5Gl880Z7kkcNN0fnQ18eM647z5P8ilpRO+6nWIzuPMOaGB6Rv3luE6s7z5vEDBHj0FtOIyxwuvMkut15AkJ3XuGm5N2UVxlwXn5mJDjaqQh255GXYBNe1IXWnVe4/p3zwpDj0Cs+f+keK5QRvCZvdx75Cy7BaTtBhzh8ONdKoHxW73T6Fjod/3/kBB2FoK87D/0uLVTA7jx//DQiyF+40SJLvF1o9xeIfm8W3Xkl9JNKmfI9UpFw8SxmDnp/NtidxxE+CQTkabBOLmNQCr0FBaXMG3YRuW1PhA9sT9idx9/cB2ejH2zxrowQP/z466sTXnO785Ll7sMAO0oWWDF+s2NmWw/nyBYX1yhhCyuQDxouQHce2V7nFF1Bhfz2TlFYQZLVTH4IMxBkm/5rB4FhEylRhqk6uwr8dU0vlrwszdau+8cyUvsa88sZxOdn3J3H8PmbgzP9d1FRSiXTkL3a3S4XEGO/bnee9Xs8x+48m6TZYFm+3jNwUy4gNx+uYEipO8/x9PHanlbwtID5nYCW0u3Oo3RCYjQCK40TcSZtmQI7WfARzOrYD3O3eLJ3C9idJyGEgXEAMsKBiZjRoREnH7+CHZ9adx5IROEVuZEDmLxuKRvx7jzgHmq7FA7yRAd/D3wL4se3uN15GKk28gR3gbdCtTvv8SL7mWiByZ/BAyPJnqhgYQKDpqXF6/juPPIwjD8dxqJodOd13TwUq7x687oe2Z1HHuVtjyNG4RAlAy1PBoPVFE3fyRC6UvQG70gvpA56wbM8s4Tv1dTuV0+ZaiMG1IRaAvS4+NfTB3pCLQGm6z/8UhbpnkRb6TfWylFSj6nfdZGuZzYdPVkdks9XrMDhROZEWZZMBMbgrn2IbXarOu+CUSvrRbIsqp2j7C5gnbdm55Pj4+NJxzMSQRGuFg5eJcfiquQ7sGfTetH5fqudGT0PPIaOINRcOyfd3Xn5613PqTbruijIxhiqqbL7Dr30LQ4MX34FbWzCR8/hwe1Q9N+8lt4aZ/hHtLvzKAOKMHBdUGqCebNrC0gxSacBIcBTW0sHFBx/t9qY2EU62AAFqMGuEyIE3X4YkhdcYOKSwt15HvAgfr++u/NA79cVpQMxQe8G8Yw2KuCNVruUAuGF+zXfnQfSNRrJW8m8+BPvzvMDJtL+oLvzAgz/yLvzvKBwdx4e4EpD6+hdeHdebj0E6dyd54MjQvInCKKCzt15ELDjdn3eBbw7D7NFEREFUKZH+nBydIClJlekcnfeNkwVrmmh2fAULOrk784r3MC78wjns3EAu9vYe+J3593ACqP1uRYbnhZFNudT1LT8GH7bvTuP/CmQGBjAMD+r3HkCUfXEN+dZrXf564V7dx6lPBMqhm7EVFB2zg7eONjeS46DM9ZTzigixTAevq1s+CGAprfTxOzfS3FnHmy989b4yUi7/ZfT09P6UlsaGVTo3uMl6Sg7xXf7elFKYpzTTNXIHRSCt85FxsHuSVKoSNTuCxSHSHv9D7CMU2K40RzTuZBNqiLao4Ah+jW/2BhJ5K+1lNQh6k7vdKLX/6XH0NgY+2ri/r0V7CSxeoyRKfxiUTzFugYXH5X9sS6qXHqonNyZDPDiFv8au8V3ygQtNLuV9Gh3E7gSTw9Z8PsL+vg/Gsm134EGJUMAAAAASUVORK5CYII="} alt="Beehive"/>
                </Link>
            </li>
        )
    })
    return (
        <div>
            <header>My Hives</header>
            {hivesArray}
        </div>
    )
}

export default HivesPage;
