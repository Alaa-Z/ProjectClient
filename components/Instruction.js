
import styles from '../styles/Instruction.module.scss'

export default function Instruction () {
    return (
        <div className={styles.container}>
                <p> To add a book to your profile for other users to borrow, please fill in the required fields:</p>
                <ul>
                    <li>
                    Title: Enter the title of the book.
                    </li>
                    <li>
                    Author: Enter the name of the book's author.
                    </li>
                    <li>
                    ISBN: Enter the right ISBN number of the book.
                    </li>
                </ul>
                <p> Once your book has been added to the website, other students will be able to see it and request to borrow it</p>
                <p> Below your profile information, you will see a list of the books you have added to your profile</p>
                <p> You will be able to  remove the book from your profile and  Mark the book as loaned or available</p>

        </div>
       
    )
}
