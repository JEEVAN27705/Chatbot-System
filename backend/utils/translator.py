from deep_translator import GoogleTranslator

def translate_to_english(text: str) -> str:
    try:
        return GoogleTranslator(source='auto', target='en').translate(text)
    except:
        return text

def translate_from_english(text: str, target_lang: str) -> str:
    try:
        return GoogleTranslator(source='en', target=target_lang).translate(text)
    except:
        return text
