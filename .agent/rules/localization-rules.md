---
trigger: always_on
---

1. Frontend UI tarafına raw text asla ekleme. Projede Türkçe-İngilizce dil desteği bulunmaktadır. messages klasör altında türkçe ve ingilizce dil desteği ekle ve bunu ui da useTranslations hooku ile kullan
2. Eğer UI'dan translate bir text silersen bunu localization dosyasında bulunuyorsa oradan da kaldır tüm dillerden
