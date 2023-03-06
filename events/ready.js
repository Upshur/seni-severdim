module.exports = (client, interaction,moment) => {
    console.log(`${client.user.tag} ismi ile giriş yapıldı`);
    var randomMesajlar = [

        "developed by mars",
        "7/24 active",
        `%64`
    
    ]
    setInterval(function() {
    
    
        var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
        
        client.user.setActivity(`${randomMesajlar1}`)
    
        
    
    
    }, 2 * 3000);
    
    client.user.setStatus('dnd')
    
    }
