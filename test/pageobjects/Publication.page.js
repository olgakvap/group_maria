const Page = require('./Page');

class PublicationPage extends Page {
  // Navigation
  get backLink() { return $('div.ant-row-space-between>a'); }
  get editButton() { return $('div.ant-row-space-between>button'); }

  // User block
  get userIcon() { return $('div.mr-2'); }
  get userNameLink() { return $('div.ant-col>a'); }

  // Publication block
  get publicationCreatedDate() { return $('div.ant-col>div'); }
  get publicationTitle() { return $('div.ant-col>div'); }
  get publicationDescription() { return $('//div[@class=\'markdown-body\']/preceding-sibling::div[1]'); }
  get publicationContent() { return $('div.mt-3>div.p-3>div.markdown-body'); }
  get publicationImage() { return $('img.ant-image-img'); }

  // Buttons
  get likeButton() { return $('#like-btn'); }
  get commentButton() { return $('#comment-btn'); }
}

module.exports = new PublicationPage();
