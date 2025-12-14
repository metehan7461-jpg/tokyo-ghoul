const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Bot Aktif");
});

app.listen(PORT, () => {
  console.log(`74.220.49.0/24 ${PORT}`);
});


const {
    Client,
    GatewayIntentBits,
    PermissionsBitField,
    EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const PREFIX = "!";
const NOCTALY_ID = "875811233616519219";

// Partner Kanal ID'si
const PARTNER_CHANNEL_ID = "1447986052387180595";

// Partner Yetkili Rol ID'si
const PARTNER_YETKILI_ID = "1448375669082816668";

// Log Kanalı ID'si
const LOG_CHANNEL_ID = "1448028746698457190";

// Warn Map
const warns = new Map();

// Türkçe küfür listesi
const kufurler = [
    "oç",
    "amk",
    "ananı sikiyim",
    "ananıskm",
    "piç",
    "amsk",
    "sikim",
    "sikiyim",
    "orospu çocuğu",
    "piç kurusu",
    "kahpe",
    "orospu",
    "sik",
    "yarrak",
    "amcık",
    "amık",
    "yarram",
    "sikimi ye",
    "mk",
    "mq",
    "aq",
    "amq",
    "siktir git",
];

// Partnerlik anahtar kelimeleri
const partnerlikKelimeleri = [
    "partner",
    "partnerlik",
    "ortaklık",
    "işbirliği",
    "reklam",
    "tanıtım",
    "anlaşma",
    "collaboration",
    "dm",
    "gel",
    "geldim",
];

client.once("ready", () => {
    console.log(`Bot hazır: ${client.user.tag}`);
    console.log(`Partner kanal ID: ${PARTNER_CHANNEL_ID}`);
    console.log(`Log kanal ID: ${LOG_CHANNEL_ID}`);
});

// ===========================================
// === 1. YENİ ÜYE HOŞ GELDİN SİSTEMİ ===
// ===========================================
client.on("guildMemberAdd", (member) => {
    const welcomeChannelId = "1448002596567646330";
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    if (welcomeChannel) {
        const welcomeEmbed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("Yeni Üye Katıldı! 🎉")
            .setDescription(
                `Aramıza **hoş geldin** ${member}! \n\nKuralları okumayı ve eğlenmeyi unutma.`,
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: `${member.guild.name} ailesi büyüyor!` });

        welcomeChannel
            .send({
                content: `🩸 Yeni bir GHOUL aramıza karıştı… **${member}**!`,
                embeds: [welcomeEmbed],
            })
            .catch(console.error);
    } else {
        console.error(
            `Hata: Hoş geldin kanalı ID'si bulunamadı. ID: ${welcomeChannelId}`,
        );
    }
});

// ===========================================
// === 2. MESAJ TABANLI İŞLEMLER ===
// ===========================================
client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    const content = message.content.toLowerCase();

    // Debug log - Partner kanalını kontrol et
    console.log(`Mesaj kanalı: ${message.channel.id}`);
    console.log(`Partner kanalı: ${PARTNER_CHANNEL_ID}`);
    console.log(`Eşleşme: ${message.channel.id === PARTNER_CHANNEL_ID}`);

    // === 2.1. PARTNERLİK SİSTEMİ ===
    if (message.channel.id === PARTNER_CHANNEL_ID) {
        console.log("Partner kanalında mesaj algılandı!");
        console.log(`Mesaj içeriği: ${content}`);

        // Partner kanalındaki HER mesaja yanıt ver
        const partnerlikVarMi = partnerlikKelimeleri.some((kelime) => {
            const sonuc = content.includes(kelime);
            console.log(`"${kelime}" kelimesi kontrol ediliyor: ${sonuc}`);
            return sonuc;
        });

        console.log(`Partnerlik kelimesi bulundu mu: ${partnerlikVarMi}`);

        if (partnerlikVarMi) {
            console.log("Partnerlik mesajı algılandı, yanıt gönderiliyor...");

            // Rastgele gecikme (1-3 saniye arası)
            const gecikme = Math.floor(Math.random() * 2000) + 1000;

            setTimeout(async () => {
                try {
                    const partnerEmbed = new EmbedBuilder()
                        .setColor("#9b59b6")
                        .setTitle("🤝 Partnerlik Başvurusu")
                        .setDescription(
                            `Merhaba ${message.author}!\n\n` +
                                `Partnerlik başvurunuz için teşekkür ederiz. ` +
                                `Ekibimiz en kısa sürede başvurunuzu inceleyecektir.\n\n` +
                                `📋 **Başvuru Şartları:**\n` +
                                `• Düzenli etkinlikler\n` +
                                `• Temiz ve düzenli sunucu\n` +
                                `• Aktif ve samimi topluluk\n\n` +
                                `💬 **İletişim:**\n` +
                                `Yetkililere <@&1448375669082816668> etiketi ile ulaşabilirsiniz.\n` +
                                `Başvurunuz 24-48 saat içinde değerlendirilecektir.`,
                        )
                        .setThumbnail(message.guild.iconURL())
                        .setFooter({
                            text: "Aogiri Ottomans | Partnerlik Sistemi",
                        })
                        .setTimestamp();

                    await message.reply({ embeds: [partnerEmbed] });
                    console.log("Embed mesajı gönderildi!");

                    // Emoji reaction ekle
                    await message.react("🤝");
                    console.log("Emoji eklendi!");
                } catch (error) {
                    console.error("Partnerlik yanıtı gönderme hatası:", error);
                }
            }, gecikme);
        } else {
            console.log("Partnerlik kelimesi bulunamadı");
        }
    }

    // === 2.2. NOCTALY HOŞ GELDİN YANITI ===
    if (message.author.id === NOCTALY_ID) {
        if (
            content.includes("welcome to aogiri ottomans") ||
            content.includes("hoşgeldiniz") ||
            content.includes("selam aramıza hoşgeldin") ||
            content.includes("gölgeler arasına hoş geldin") ||
            content.includes("aogiri ottomans")
        ) {
            const gecikme = Math.floor(Math.random() * 2000) + 1000;
            setTimeout(() => {
                message.channel.send("hg").catch(console.error);
            }, gecikme);
        }
    }

    // === 2.3. KÜFÜR KONTROLÜ ===
    let kufurVarMi = false;
    const regexKufurler = kufurler.map((k) => `\\b${k}\\b`);
    const regex = new RegExp(regexKufurler.join("|"), "i");
    if (regex.test(message.content)) {
        kufurVarMi = true;
    }
    if (/\b(sg|siktir git)\b/i.test(message.content)) {
        kufurVarMi = true;
    }

    if (kufurVarMi) {
        try {
            await message.delete();
            const userId = message.author.id;
            const mevcutWarn = warns.get(userId) || 0;
            const yeniWarn = mevcutWarn + 1;
            warns.set(userId, yeniWarn);

            const uyariEmbed = new EmbedBuilder()
                .setColor("#FF0000")
                .setTitle("Uyarı Aldın!")
                .setDescription(
                    `Sunucuda küfür kullandığın için mesajın silindi.\nToplam uyarın: **${yeniWarn}**`,
                )
                .addFields({ name: "Sebep", value: "Küfür kullanımı" })
                .setTimestamp();

            await message.author.send({ embeds: [uyariEmbed] }).catch(() => {});
            await message.channel.send(
                `${message.author}, küfür kullanma! Uyarı: **${yeniWarn}/3**`,
            );

            if (yeniWarn >= 3) {
                const member = await message.guild.members.fetch(userId);
                if (member.moderatable) {
                    await member.timeout(10 * 60 * 1000, "3 küfür uyarısı");
                    await message.channel.send(
                        `${message.author} 3 uyarı aldığı için 10 dakika susturuldu.`,
                    );
                    warns.set(userId, 0);
                }
            }
        } catch (err) {
            console.error("Küfür sistemi hatası:", err);
        }
        return;
    }

    // === 2.4. MANUEL WARN KOMUTU ===
    if (message.content.startsWith(PREFIX + "warn")) {
        if (
            !message.member.permissions.has(
                PermissionsBitField.Flags.ManageMessages,
            )
        ) {
            return message.reply(
                "Bu komutu kullanmak için **Mesajları Yönet** yetkin olmalı!",
            );
        }
        const args = message.content
            .slice(PREFIX.length + 4)
            .trim()
            .split(/ +/);
        const target = message.mentions.members.first();
        if (!target || args.length < 2) {
            return message.reply("Doğru kullanım: `!warn @kullanıcı <sebep>`");
        }
        const sebep = args.slice(1).join(" ");
        const userId = target.id;
        const mevcutWarn = warns.get(userId) || 0;
        const yeniWarn = mevcutWarn + 1;
        warns.set(userId, yeniWarn);

        const embed = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("Uyarı Aldın!")
            .setDescription(
                `**Yetkili:** ${message.author}\n**Sebep:** ${sebep}\n**Toplam uyarı:** ${yeniWarn}`,
            )
            .setTimestamp();

        await target.send({ embeds: [embed] }).catch(() => {});
        await message.channel.send(
            `${target} uyarıldı! Sebep: **${sebep}** | Toplam uyarı: **${yeniWarn}**`,
        );

        if (yeniWarn >= 3) {
            if (target.moderatable) {
                await target.timeout(10 * 60 * 1000, "3 uyarı (manuel dahil)");
                await message.channel.send(
                    `${target} 3 uyarı aldığı için 10 dakika susturuldu.`,
                );
                warns.set(userId, 0);
            }
        }
    }

    // === 2.5. PARTNERLİK BİLGİ KOMUTU ===
    if (message.content.startsWith(PREFIX + "partner")) {
        const partnerBilgiEmbed = new EmbedBuilder()
            .setColor("#9b59b6")
            .setTitle("🤝 Partnerlik Bilgileri")
            .setDescription(
                "**Aogiri Ottomans** sunucusu ile partnerlik kurmak için gerekli bilgiler:",
            )
            .addFields(
                {
                    name: "📋 Başvuru Şartları",
                    value:
                        "• Düzenli etkinlikler\n" +
                        "• Temiz ve düzenli sunucu\n" +
                        "• Toksik olmayan topluluk\n" +
                        "• Aktif ve samimi üyeler",
                    inline: false,
                },
                {
                    name: "📝 Başvuru Süreci",
                    value:
                        "1. <#1447986052387180595> kanalına gidin\n" +
                        "2. Sunucu bilgilerinizi paylaşın\n" +
                        "3. Partnerlik talebinizi belirtin\n" +
                        "4. Ekibimiz 24-48 saat içinde döner",
                    inline: false,
                },
                {
                    name: "💎 Partnerlik Avantajları",
                    value:
                        "• Özel partner rolü\n" +
                        "• Reklam kanalında tanıtım\n" +
                        "• Etkinlik işbirlikleri\n" +
                        "• Karşılıklı büyüme fırsatı",
                    inline: false,
                },
            )
            .setFooter({ text: "Başvurularınızı bekliyoruz!" })
            .setTimestamp();

        await message.reply({ embeds: [partnerBilgiEmbed] });
    }
});

// Bot girişi
client.login(process.env.TOKEN);

// ===========================================
// === 3. LOG SİSTEMİ ===
// ===========================================

// Helper fonksiyon - Log gönderme
async function sendLog(guild, embed) {
    try {
        const logChannel = guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) {
            await logChannel.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error("Log gönderme hatası:", error);
    }
}

// === 3.1. MESAJ SİLME LOGU ===
client.on("messageDelete", async (message) => {
    if (!message.guild || message.author?.bot) return;

    const deleteEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("🗑️ Mesaj Silindi")
        .setDescription(
            `**Kanal:** ${message.channel}\n**Kullanıcı:** ${message.author.tag}`,
        )
        .addFields(
            {
                name: "Mesaj İçeriği",
                value: message.content || "*Embed veya dosya*",
            },
            { name: "Mesaj ID", value: message.id, inline: true },
            { name: "Kanal ID", value: message.channel.id, inline: true },
        )
        .setThumbnail(message.author?.displayAvatarURL())
        .setTimestamp();

    await sendLog(message.guild, deleteEmbed);
});

// === 3.2. MESAJ DÜZENLEME LOGU ===
client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (!newMessage.guild || newMessage.author?.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const editEmbed = new EmbedBuilder()
        .setColor("#FFA500")
        .setTitle("✏️ Mesaj Düzenlendi")
        .setDescription(
            `**Kanal:** ${newMessage.channel}\n**Kullanıcı:** ${newMessage.author.tag}`,
        )
        .addFields(
            { name: "Eski Mesaj", value: oldMessage.content || "*Yok*" },
            { name: "Yeni Mesaj", value: newMessage.content || "*Yok*" },
            { name: "Mesaj Linki", value: `[Mesaja Git](${newMessage.url})` },
        )
        .setThumbnail(newMessage.author?.displayAvatarURL())
        .setTimestamp();

    await sendLog(newMessage.guild, editEmbed);
});

// === 3.3. ÜYE SUNUCUDAN AYRILMA LOGU ===
client.on("guildMemberRemove", async (member) => {
    const leaveEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("👋 Üye Ayrıldı")
        .setDescription(`**${member.user.tag}** sunucudan ayrıldı`)
        .addFields(
            { name: "Kullanıcı ID", value: member.id, inline: true },
            {
                name: "Sunucuya Katılma",
                value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
                inline: true,
            },
            {
                name: "Hesap Oluşturma",
                value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
                inline: true,
            },
        )
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({ text: `Toplam Üye: ${member.guild.memberCount}` })
        .setTimestamp();

    await sendLog(member.guild, leaveEmbed);
});

// === 3.4. ROL DEĞIŞIKLIĞI LOGU ===
client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    // Rol eklendi
    const addedRoles = newRoles.filter((role) => !oldRoles.has(role.id));
    if (addedRoles.size > 0) {
        const roleAddEmbed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("➕ Rol Eklendi")
            .setDescription(`**Kullanıcı:** ${newMember.user.tag}`)
            .addFields(
                {
                    name: "Eklenen Roller",
                    value: addedRoles.map((r) => r.name).join(", "),
                },
                { name: "Kullanıcı ID", value: newMember.id },
            )
            .setThumbnail(newMember.user.displayAvatarURL())
            .setTimestamp();

        await sendLog(newMember.guild, roleAddEmbed);
    }

    // Rol silindi
    const removedRoles = oldRoles.filter((role) => !newRoles.has(role.id));
    if (removedRoles.size > 0) {
        const roleRemoveEmbed = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("➖ Rol Silindi")
            .setDescription(`**Kullanıcı:** ${newMember.user.tag}`)
            .addFields(
                {
                    name: "Silinen Roller",
                    value: removedRoles.map((r) => r.name).join(", "),
                },
                { name: "Kullanıcı ID", value: newMember.id },
            )
            .setThumbnail(newMember.user.displayAvatarURL())
            .setTimestamp();

        await sendLog(newMember.guild, roleRemoveEmbed);
    }
});

// === 3.5. KANAL OLUŞTURMA LOGU ===
client.on("channelCreate", async (channel) => {
    if (!channel.guild) return;

    const channelCreateEmbed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("📝 Kanal Oluşturuldu")
        .setDescription(`**Kanal:** #${channel.name}`)
        .addFields(
            { name: "Kanal Adı", value: channel.name, inline: true },
            {
                name: "Kanal Tipi",
                value: channel.type.toString(),
                inline: true,
            },
            { name: "Kanal ID", value: channel.id, inline: true },
        )
        .setTimestamp();

    await sendLog(channel.guild, channelCreateEmbed);
});

// === 3.6. KANAL SİLME LOGU ===
client.on("channelDelete", async (channel) => {
    if (!channel.guild) return;

    const channelDeleteEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("🗑️ Kanal Silindi")
        .addFields(
            { name: "Kanal Adı", value: channel.name, inline: true },
            {
                name: "Kanal Tipi",
                value: channel.type.toString(),
                inline: true,
            },
            { name: "Kanal ID", value: channel.id, inline: true },
        )
        .setTimestamp();

    await sendLog(channel.guild, channelDeleteEmbed);
});

// === 3.7. BAN LOGU ===
client.on("guildBanAdd", async (ban) => {
    const banEmbed = new EmbedBuilder()
        .setColor("#8B0000")
        .setTitle("🔨 Kullanıcı Banlandı")
        .setDescription(`**${ban.user.tag}** sunucudan banlandı`)
        .addFields(
            { name: "Kullanıcı ID", value: ban.user.id, inline: true },
            {
                name: "Hesap Oluşturma",
                value: `<t:${Math.floor(ban.user.createdTimestamp / 1000)}:R>`,
                inline: true,
            },
            {
                name: "Ban Sebebi",
                value: ban.reason || "Belirtilmemiş",
                inline: false,
            },
        )
        .setThumbnail(ban.user.displayAvatarURL())
        .setTimestamp();

    await sendLog(ban.guild, banEmbed);
});

// === 3.8. BAN KALDIRMA LOGU ===
client.on("guildBanRemove", async (ban) => {
    const unbanEmbed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("✅ Ban Kaldırıldı")
        .setDescription(`**${ban.user.tag}** kullanıcısının banı kaldırıldı`)
        .addFields(
            { name: "Kullanıcı ID", value: ban.user.id, inline: true },
            { name: "Kullanıcı Adı", value: ban.user.tag, inline: true },
        )
        .setThumbnail(ban.user.displayAvatarURL())
        .setTimestamp();

    await sendLog(ban.guild, unbanEmbed);
});

// === 3.9. SESLİ KANAL LOGLARı ===
client.on("voiceStateUpdate", async (oldState, newState) => {
    const member = newState.member;

    // Sesli kanala katıldı
    if (!oldState.channel && newState.channel) {
        const joinVoiceEmbed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("🔊 Sesli Kanala Katıldı")
            .setDescription(`**${member.user.tag}** sesli kanala katıldı`)
            .addFields(
                { name: "Kanal", value: newState.channel.name, inline: true },
                { name: "Kullanıcı ID", value: member.id, inline: true },
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        await sendLog(newState.guild, joinVoiceEmbed);
    }

    // Sesli kanaldan ayrıldı
    if (oldState.channel && !newState.channel) {
        const leaveVoiceEmbed = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("🔇 Sesli Kanaldan Ayrıldı")
            .setDescription(`**${member.user.tag}** sesli kanaldan ayrıldı`)
            .addFields(
                { name: "Kanal", value: oldState.channel.name, inline: true },
                { name: "Kullanıcı ID", value: member.id, inline: true },
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        await sendLog(oldState.guild, leaveVoiceEmbed);
    }

    // Sesli kanal değiştirdi
    if (
        oldState.channel &&
        newState.channel &&
        oldState.channel.id !== newState.channel.id
    ) {
        const switchVoiceEmbed = new EmbedBuilder()
            .setColor("#FFA500")
            .setTitle("🔄 Sesli Kanal Değiştirdi")
            .setDescription(`**${member.user.tag}** sesli kanal değiştirdi`)
            .addFields(
                {
                    name: "Eski Kanal",
                    value: oldState.channel.name,
                    inline: true,
                },
                {
                    name: "Yeni Kanal",
                    value: newState.channel.name,
                    inline: true,
                },
            )
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

        await sendLog(newState.guild, switchVoiceEmbed);
    }
});
