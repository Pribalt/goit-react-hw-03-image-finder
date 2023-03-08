import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  Button,
  Span,
  Input,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.value.trim()) {
      toast.error('The search field is empty!');
      return;
    }

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <Header>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <BsSearch />
            <Span>Search</Span>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
