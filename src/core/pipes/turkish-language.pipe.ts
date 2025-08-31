import { Pipe, PipeTransform } from '@angular/core';
import { LanguageInterface, Languages } from '../data/languages';

@Pipe({
    name: 'turkishLanguage'
})
export class TurkishLanguagePipe implements PipeTransform {
    transform(language: { english_name: string, iso_639_1: string, name: string }): string {
        const languages: LanguageInterface[] = Languages;
        const turkishName = languages.find(lang => lang.iso_639_1.toLowerCase() == language.iso_639_1.toLowerCase())?.turkish_name;
        return turkishName ? turkishName : language.english_name;
    }
}